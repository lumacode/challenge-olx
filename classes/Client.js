const ClientArg = require('../models/ClientArg.js');
const ClientCl = require('../models/ClientCl.js');

class Client {

    constructor({firstName, lastName, gender, nacionalId, birthDate, father}){

        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.nacionalId = nacionalId;
        this.birthDate = birthDate;
        this.father = father ? father : null;

    }

    async create(countryCode){

        if(countryCode === 'ar'){

            const isClientExist = await ClientArg.findOne({ nacionalId: this.nacionalId });
            if (isClientExist) {
                return {exist: true}
            }

            const client = new ClientArg();
            client.firstName = this.firstName.toLowerCase();
            client.lastName = this.lastName.toLowerCase();
            client.gender = this.gender.toLowerCase();
            client.nacionalId = this.nacionalId;
            client.birthDate = this.birthDate;

            const result = await client.save();

            return result; 

        }

        if(countryCode === 'cl'){

            const isClientExist = await ClientCl.findOne({ nacionalId: this.nacionalId });
            if (isClientExist) {
                return {exist: true}
            }

            const client = new ClientCl();
            client.firstName = this.firstName.toLowerCase();
            client.lastName = this.lastName.toLowerCase();
            client.gender = this.gender.toLowerCase();
            client.nacionalId = this.nacionalId;
            client.birthDate = this.birthDate;
            client.father.firstName = this.father.firstName;
            client.father.lastName = this.father.lastName;
    
            const result = await client.save();
    
            return result; 
    
        }

    }

}//end class

module.exports = Client;



