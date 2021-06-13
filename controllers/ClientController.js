const validator = require('../utils/validator');
const __ = require('../utils/translator');
const { generateLog } = require('../utils/generateLog');
const Client = require('../classes/Client');
const { calculateAge } = require('../utils/helpers');

const ClientController = {

    onboarding: async (req, res) => {

        const lang = req.query.lang ? req.query.lang : 'EN_us';
        const { countryCode } = req.params;

        try {

            if(countryCode === 'cl'){

                const { firstName, lastName, gender, nacionalId, birthDate, father } = req.body;
                
                if(!firstName || !lastName || !gender || !nacionalId || !birthDate || !father || !father.firstName || !father.lastName)  
                return res.status(422).json({status: 'error', message: __('Incorrect fields.', lang)});

                if(!validator.stringText(firstName, 100)) return res.status(422).json({status: 'error', message: __('Invalid firstName.', lang)});
                if(!validator.stringText(lastName, 100)) return res.status(422).json({status: 'error', message: __('Invalid lastName.', lang)});
                if(!validator.stringText(gender, 1)) return res.status(422).json({status: 'error', message: __('Invalid gender.', lang)});
                if(!validator.rut(nacionalId)) return res.status(422).json({status: 'error', message: __('Invalid RUT.', lang)});
                if(!validator.date(birthDate)) return res.status(422).json({status: 'error', message: __('Invalid birthdate.', lang)});
                if(!validator.stringText(father.firstName)) return res.status(422).json({status: 'error', message: __('Invalid father firstname.', lang)});
                if(!validator.stringText(father.lastName)) return res.status(422).json({status: 'error', message: __('Invalid father lastName.', lang)});
                
                const age = calculateAge(birthDate); 
                if(age <= 17 || age >= 80) return res.status(422).json({status: 'error', message: __('The clients age must be over 17 and under 80.', lang)});
                
                const createClient = new Client(req.body);
                const result = await createClient.create(countryCode);

                if(result._id) return res.status(200).json({status: 'ok', message: __('The client was created successfully.', lang), clientId: result._id});
                if(result.exist) return res.status(422).json({status: 'error', message: __('The client already registered.', lang), clientId: result._id});
                
                throw 'Insert Client DB error - Cod: db001';
                
            }
    
            if(countryCode === 'ar'){
    
                const { firstName, lastName, gender, nacionalId, birthDate } = req.body;
                
                if(!firstName || !lastName || !gender || !nacionalId || !birthDate)  
                return res.status(422).json({status: 'error', message: __('Incorrect fields.', lang)});

                if(!validator.stringText(firstName, 100)) return res.status(422).json({status: 'error', message: __('Invalid firstName.', lang)});
                if(!validator.stringText(lastName, 100)) return res.status(422).json({status: 'error', message: __('Invalid lastName.', lang)});
                if(!validator.stringText(gender, 1)) return res.status(422).json({status: 'error', message: __('Invalid gender.', lang)});
                if(!validator.cuit(nacionalId)) return res.status(422).json({status: 'error', message: __('Invalid CUIT.', lang)});
                if(!validator.date(birthDate)) return res.status(422).json({status: 'error', message: __('Invalid birthdate.', lang)});
                
                const age = calculateAge(birthDate); 
                if(age <= 17 || age >= 80) return res.status(422).json({status: 'error', message: __('The clients age must be over 17 and under 80.', lang)});
                
                const createClient = new Client(req.body);
                const result = await createClient.create(countryCode);

                if(result._id) return res.status(200).json({status: 'ok', message: __('The client was created successfully.', lang), clientId: result._id});
                if(result.exist) return res.status(422).json({status: 'error', message: __('The client already registered.', lang), clientId: result._id});
                
                throw 'Insert Client DB error - Cod: db001';

            }
    
            return res.status(400).json({status: 'error', message: __('You must enter the country code.', lang)});
            
            
        } catch (error) {
            generateLog(error);
            return res.status(500).json({status: 'error', message: __('Server error.', lang)});
        }

      

    }


}//end method

module.exports = ClientController;