module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/donate/create',
        handler: 'donation.donateCreate',
        config: {
          auth: false 
        },
      },
    ],
  };
  