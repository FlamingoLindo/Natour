import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::client.client', ({ strapi }) => ({
  async countByMonth(ctx) {
    try {
        const { startDate, endDate } = ctx.query; 

        const result = await strapi.db.query('api::client.client').findMany({
            select: ['id', 'createdAt'],
            where: {
                createdAt: {
                    $gte: new Date(startDate || '2024-01-01'), 
                    $lte: new Date(endDate || new Date()),
                },
            },
        });

        // Group by month
        const groupedByMonth = result.reduce((acc, client) => {
            const month = new Date(client.createdAt).toLocaleString('default', { month: 'long'});
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});

        ctx.send({
            data: groupedByMonth,
        });
        } catch (error) {
            ctx.throw(500, error);
        }
  },
}));
