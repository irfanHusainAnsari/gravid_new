const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
},
isValidVehicleRegistrationNumber = regNo => {
    let pattern1 = /[A-Z]{2}[0-9]{2} [A-Z]{2} \d{4}$/i,
    pattern2 = /[A-Z]{3} [A-Z]{1} \d{4}$/i,
    pattern3 = /[A-Z]{2}[0-9]{1} [A-Z]{2} \d{4}$/i,
    pattern4 = /[A-Z]{2}[0-9]{2}[A-Z]{2}\d{4}$/i,
    pattern5 = /[A-Z]{3}[A-Z]{1}\d{4}$/i,
    pattern6 = /[A-Z]{2}[0-9]{1}[A-Z]{2}\d{4}$/i
    if (regNo.match(pattern1) !== null || regNo.match(pattern2) !== null || regNo.match(pattern3) !== null||regNo.match(pattern4) !== null || regNo.match(pattern5) !== null || regNo.match(pattern6) !== null)
        return true
    else
        return false
},
isIfSC = code =>{
    console.log('valuevalue', code)
    var regex = new RegExp( "^[A-Z]{4}0[A-Z0-9]{6}$");
    return regex.test(code)
},
isSpace = value => {
    let regex =  /^\S{3,}$/;
    return regex.test(value)
},
isWhiteSpace = value =>{
    console.log('valuevalue', value)
    var regex = /(?!\s*$)[-a-zA-Z0-9_:,.\s]{1,100}$/;
    return regex.test(value)
},
isValidPanCard = pan => {
    let regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    return regex.test(pan.toUpperCase())
},
isValidAadharCard = aadhar => {
    let regex = /([0-9]){12}$/;
    return regex.test(aadhar)
},
isValidMobile = mobile => {
    let regex = /([0-9]){10}$/;
    return regex.test(mobile)
},
isValidPinCode = pinCode => {
    let regex = /^[1-9][0-9]{5}$/;
    return regex.test(pinCode)
},
isValidPassword = password => {
    let regex =  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    return regex.test(password)
}
export {
    isValidMobile,
    isValidPassword,
    isValidPinCode,
    isValidEmail,
    isValidVehicleRegistrationNumber,
    isValidAadharCard,
    isValidPanCard,
    isSpace,
    isWhiteSpace,
    isIfSC
}