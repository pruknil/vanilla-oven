const Helper = {
    validEmail: function(val,setEmailValidError){
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (val.length === 0) {
                setEmailValidError('email address must be enter');
            } else if (reg.test(val) === false) {
                setEmailValidError('enter valid email address');
            } else if (reg.test(val) === true) {
                setEmailValidError('');
            }
    },
}

export default Helper;