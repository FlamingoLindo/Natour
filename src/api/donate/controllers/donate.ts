/**
 * donate controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::donate.donate', ({ strapi }) => ({
  async create(ctx) {
    try {
      
      const existingDonation = await strapi.db.query('api::donate.donate').findOne();

      if (existingDonation) {
        return ctx.throw(400, 'Já uma campanha cadastrada, delete ela para criar uma nova!');
      }

      const newDonation = await strapi.entityService.create('api::donate.donate', {
        data: {
          ...ctx.request.body,
          publishedAt: new Date(), 
        },
      });

      return ctx.send({
        message: 'Nova campanha criada com sucesso!',
        data: newDonation,
      });
    } catch (error) {
      ctx.throw(500, error); 
    }
  },
}));
