import { ApiPromise, WsProvider } from '@polkadot/api';

import { EventsSearchParameters, EventsTableData } from './scanSlice';

const create = (ws: string = 'wss://rpc.polkadot.io'): Promise<ApiPromise> => {
  const wsProvider = new WsProvider(ws);

  return new Promise(async(resolve, reject) => {
    wsProvider.on('error', () => {
      wsProvider.disconnect();
      reject('Failed to connect polkadot endpoint');
    });
    wsProvider.on('connected', () =>
      ApiPromise.create({ provider: wsProvider })
        .then(resolve)
        .catch(reject)
      );
  });
};

export const getLatestBlock = async (api?: ApiPromise): Promise<number> => {
  if (!api) {
    api = await create();
  };

  const lastHeader = await api.rpc.chain.getHeader();

  return lastHeader.number.toNumber();
};

const getBlockDetails = async (api: ApiPromise, block: number): Promise<EventsTableData[]> => {
  const blockHash = await api.rpc.chain.getBlockHash(block);
  const signedStartBlock = await api.rpc.chain.getBlock(blockHash);

  const allRecords = await api.query.system.events.at(signedStartBlock.block.header.hash);

  const results: EventsTableData[] = [];

  signedStartBlock.block.extrinsics.forEach(({ method: { method, section } }, index) => {
    const extrinsic = `${section}.${method}`;
    // filter the specific events based on the phase and then the
    // index of our extrinsic in the block
    allRecords
      .filter(({ phase }) =>
        phase.isApplyExtrinsic &&
        phase.asApplyExtrinsic.eq(index)
      )
      .forEach(({ event }) => results.push({
        event: `${event.section}.${event.method}`,
        data: event.data.toHuman(),
        extrinsic,
        block
      }));
  });

  return results;
};

export const getEvents = async (options: EventsSearchParameters): Promise<EventsTableData[]> => {
  const api = await create(options.endpoint);

  const latestBlock = await getLatestBlock(api);
  const startBlockInt = +options.startBlock;
  const endBlockInt = +options.endBlock;

  if (latestBlock < endBlockInt) {
    throw new Error(`Start/end block exceeds latest block: ${latestBlock}`);
  }

  const promises: Promise<EventsTableData[]>[] = [];

  for (let block = startBlockInt; block <= endBlockInt; block++) {
    promises.push(getBlockDetails(api, block));
  }

  const results = await Promise.all(promises);

  return results.flat();
};
