import {provider} from "../specs/init-pact";
import {AnimalController} from "../../../controllers";
import {Matchers} from "@pact-foundation/pact";

describe('Given an animal service', () => {
    describe('When a request to register an animal is made', () => {
        const animal = {
            name: "Pelusa",
            breed: "Siames",
            gender: "Male",
            isVaccinated: true
        }
        beforeAll(async () => {
            await provider.setup();
            await provider.addInteraction({
                state: 'register an animal',
                uponReceiving: 'a request to register an animal',
                withRequest: {
                    method: 'POST',
                    path: '/animals',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: animal
                },
                willRespondWith: {
                    status: 201,
                    body: Matchers.like({
                        name: "Pelusa",
                        breed: "Siames",
                        gender: "Male",
                        isVaccinated: true
                    })
                }
            });
        });

        it('Then it should return the right http code', async () => {
            const response = await AnimalController.register(animal);
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });

        afterAll(async () => {
            await provider.finalize();
        })
    });
});