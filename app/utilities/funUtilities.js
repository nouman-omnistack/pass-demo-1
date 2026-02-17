import crypto from 'crypto'

// Utility function to get the current date and time in 'YYYYMMDDHHMMSS' format
export function getCurrentDate() {

    const date = new Date();
    
    const year  = date.getFullYear().toString().slice(2);           // Get the last two digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0');     // Pad the month with a leading zero if needed
    const day   = String(date.getDate()).padStart(2, '0');          // Pad the day with a leading zero if needed
    const hour  = String(date.getHours()).padStart(2, '0');         // Pad the hour with a leading zero if needed
    const minutes = String(date.getMinutes()).padStart(2, '0');     // Pad the minutes with a leading zero if needed
    const seconds = String(date.getSeconds()).padStart(2, '0');     // Pad the seconds with a leading zero if needed

    const vtime = `${year}${month}${day}${hour}${minutes}${seconds}`; // Concatenate the formatted date-time string
    // console.log("PASSButtonLink Component - Current Date Time : " + vtime);
    return vtime;
}

// Authentication window and form submitted call function
export function authTypeCheck() {

    var auth_form = document.form_auth;

    if (auth_form.kcp_page_submit_yn.value != "Y")
    {
      //var return_gubun;
      var width  = 410;
      var height = 500;
      var leftpos = screen.width  / 2 - ( width  / 2 );
      var toppos  = screen.height / 2 - ( height / 2 );
      var winopts  = "width=" + width   + ", height=" + height + ", toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no";
      var position = ",left=" + leftpos + ", top="    + toppos;
      var AUTH_POP = window.open('', 'auth_popup', winopts + position);
      auth_form.target = "auth_popup";
    }

    auth_form.submit();
    return true;
}


// Create a KeyObject from configured value. Support:
// - raw PEM in env
// - filesystem path to PEM
// - base64-encoded PEM or DER
export function createPrivateKeyObject(value, passphrase) {
  if (!value) throw new Error('Private key not configured')
  const v = value
    .trim()
    .replace('-----BEGIN ENCRYPTED PRIVATE KEY-----', '')
    .replace('-----END ENCRYPTED PRIVATE KEY-----', '') // in case newlines are escaped in env

  // Helper to attempt parsing using different formats
  const tryCreate = (key, options) => {
    try {
      return crypto.createPrivateKey(Object.assign({ key }, options))
    } catch (err) {
      return null
    }
  }

  // If looks like PEM text
  if (v.startsWith('-----BEGIN')) {
    const obj = tryCreate(v, { passphrase })
    if (obj) return obj
  }

  // // If it's a path
  // if (fs.existsSync(v)) {
  //   const fileBuf = fs.readFileSync(v)
  //   // try as PEM first
  //   const asPem = fileBuf.toString('utf8')
  //   if (asPem.includes('-----BEGIN')) {
  //     const obj = tryCreate(asPem, { passphrase })
  //     if (obj) return obj
  //   }
  //   // try as DER pkcs8
  //   const objDer = tryCreate(fileBuf, { format: 'der', type: 'pkcs8', passphrase })
  //   if (objDer) return objDer
  // }

  // Try base64-decoded as PEM or DER
  try {
    const decoded = Buffer.from(v, 'base64')
    const asText = decoded.toString('utf8')
    if (asText.includes('-----BEGIN')) {
      const obj = tryCreate(asText, { passphrase })
      if (obj) return obj
    }
    const objDer = tryCreate(decoded, { format: 'der', type: 'pkcs8', passphrase })
    if (objDer) return objDer
  } catch (e) {
    // ignore
  }

  throw new Error('Unsupported or invalid private key format')
}

