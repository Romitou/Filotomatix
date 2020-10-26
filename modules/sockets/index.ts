// @ts-nocheck
import http from 'http';
import socketIO from 'socket.io';

export default function () {
  this.nuxt.hook('render:before', () => {
    const server: http.Server = http.createServer(this.nuxt.renderer.app);
    const io: socketIO.Server = socketIO(server);
    this.nuxt.server.listen = (port, host) => new Promise(resolve => server.listen(port || 3000, host || 'localhost', resolve));
    this.nuxt.hook('close', async () => {
      await server.close();
    });
  });
}
