
import chai           from 'chai';
import chaiAsPromised from 'chai-as-promised';
import request        from 'supertest'
import {StatusCodes}  from 'http-status-codes';
import app            from '../app'

chai.use(chaiAsPromised);

describe('e2e API tests', () => {
    context('Base endpoint', () => {
        it('should work', async () => {
            const response = await request(app)
                .get('/')
                .expect(StatusCodes.OK)

            chai.expect(response.body).to.equals('TO-DO API')
        })
    })
})