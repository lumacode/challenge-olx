const validator = {

    cuit: (cuit) => {

        if (cuit.length !== 13) { //this can also be configured to be received without hyphens
            return false;
          }
      
          let cuitFix = cuit.replace(/-/g,'');
          let acumulado = 0;
          let digitos = cuitFix.split('');
          let digito = parseInt(digitos.pop());
        
          for (let i = 0; i < digitos.length; i++) {
            acumulado += digitos[9 - i] * (2 + (i % 6));
          }
        
          let verif = 11 - (acumulado % 11);
          if (verif === 11) {
            verif = 0;
          } else if (verif === 10) {
            verif = 9;
          }
        
          return digito === verif;

    },
    rut : (rutComplet) => {
      if (!/^[0-9]+-[0-9kK]{1}$/.test( rutComplet ))
        return false;
      var tmp 	= rutComplet.split('-');
      var digv	= tmp[1]; 
      var rut 	= tmp[0];
      if ( digv == 'K' ) digv = 'k' ;
      return (validator.dv(rut) == digv );
    },
    dv : (T) => {
      var M=0,S=1;
      for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
      return S?S-1:'k';
    },
    stringText : (str, lng=null) => {
      if( lng >= 1 && str.length > lng) return false 
      const expR = /^[a-z\s]+$/i;
      return expR.test(str);
    },
    date: (date) => {
      const expR = /^\d{4}([\/])(0?[1-9]|1[0-2])\1(3[01]|[12][0-9]|0?[1-9])$/;
      return expR.test(date);
    }

}//end method


module.exports = validator;