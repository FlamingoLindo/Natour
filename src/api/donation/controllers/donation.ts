import { factories } from '@strapi/strapi';
import { Context } from 'koa';

export default factories.createCoreController('api::donation.donation', ({ strapi }) => ({
  async donateCreate(ctx: Context) {
    try {
      // Get the IDs of the previous donations
      const previousDonations = await strapi.db.query('api::donation.donation').findMany({
        select: ['id'], // Select only the 'id' field
        where: {}, // Optionally add conditions
      });

      // Collect the IDs to delete
      const donationIds = previousDonations.map((donation: { id: number }) => donation.id);

      // Delete previous donations if there are any
      if (donationIds.length > 0) {
        await strapi.entityService.deleteMany('api::donation.donation', {
          filters: { id: { $in: donationIds } }, // Use 'filters' instead of 'where'
        });
      }

      // Create a new donation and mark it as published
      const newDonation = await strapi.entityService.create('api::donation.donation', {
        data: {
          ...ctx.request.body,
          publishedAt: new Date(), // Set the current date and time to mark it as published
        },
      });

      // Return success message with new donation data
      return ctx.send({
        message: 'Doação anterior deletada e nova doação cadastra com sucesso!',
        data: newDonation,
      });
    } catch (error) {
      ctx.throw(500, error); // Handle any errors
    }
  },
}));
