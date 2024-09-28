module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/clientByMonth',
        handler: 'client.countByMonth', 
        config: {
          auth: {
            strategies: ['jwt']
          }
        },
      },
    ],
  };
  