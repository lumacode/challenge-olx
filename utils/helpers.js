const helpers = {

    calculateAge : (birthDate) => {
        const today = new Date();
        const birthD = new Date(birthDate);
        let age = today.getFullYear() - birthD.getFullYear();
        const m = today.getMonth() - birthD.getMonth();
    
        if (m < 0 || (m === 0 && today.getDate() < birthD.getDate())) {
            age--;
        }
    
        return age;
    }
}

module.exports = helpers;