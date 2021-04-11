import { server } from './entities';

const main = async () => {
  try {
    const port = parseInt(process.env.PORT as string) || 3000;

    server(port);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

main();
