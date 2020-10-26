// @ts-nocheck
import http from 'http';
import socketIO from 'socket.io';

export default function () {
  this.nuxt.hook('render:before', () => {
    const server: http.Server = http.createServer(this.nuxt.renderer.app);
    const io: socketIO.Server = socketIO(server);
    this.nuxt.server.listen = () => new Promise(resolve => server.listen(this.nuxt.server.options.server.port, this.nuxt.server.options.server.host, resolve));
    this.nuxt.hook('close', async () => {
      await server.close();
    });
  });
}
