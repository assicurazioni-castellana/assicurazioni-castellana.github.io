import emailjs from '@emailjs/browser';

const sendEmail = async (message) => {
    var templateParams = {
        email: 'gliasphaltatori@gmail.com',
        subject: 'NUOVO PREVENTIVO!',
        message: message
    };
    const response = await emailjs.send("service_5viaii5", "template_uxa0gu9", templateParams ,"-U8Iow28ECqLL8pb0");
    if (response.status==200){
        return true;
    }else{
        return false;
    }
};

export {sendEmail};