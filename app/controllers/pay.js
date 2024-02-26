// const axios = require('axios');
// const fs = require('fs');

// // Define your merchant identifier and certificate paths
// const merchantIdentifier = 'your_merchant_identifier';
// const certificatePath = '/path/to/your/certificate.pem';
// const privateKeyPath = '/path/to/your/private_key.pem';

// // Prepare the Apple Pay payment request
// const paymentRequest = {
//   countryCode: 'JP',
//   currencyCode: 'JPY',
//   supportedNetworks: ['visa', 'masterCard', 'amex'],
//   merchantCapabilities: ['supports3DS'],
//   total: {
//     label: 'My Store',
//     amount: '1000',
//   },
// };

// // Convert the payment request to a JSON string
// const paymentRequestJSON = JSON.stringify(paymentRequest);

// // Prepare the headers for the request
// const headers = {
//   'Content-Type': 'application/json',
//   'Content-Length': paymentRequestJSON.length,
// };

// // Read the certificate and private key files
// const certificate = fs.readFileSync(certificatePath);
// const privateKey = fs.readFileSync(privateKeyPath);

// // Prepare the Axios request configuration
// const config = {
//   url: 'https://apple-pay-gateway.apple.com/paymentservices/paymentSession',
//   method: 'post',
//   headers: headers,
//   data: paymentRequestJSON,
//   httpsAgent: new https.Agent({
//     cert: certificate,
//     key: privateKey,
//   }),
// };

// // Send the Axios request to Apple Pay server
// axios(config)
//   .then((response) => {
//     // Process the response from Apple Pay server
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });




// -------------------------------Google pay

// const axios = require('axios');

// async function createGooglePayRequest() {
//   try {
//     // Step 1: Send the Google Pay request
//     const payload = {
//       // ... Google Pay request payload
//     };

//     const response = await axios.post('https://payments.google.com/payments/apis/request', payload);

//     // Step 2: Receive the response
//     const googlePayResponse = response.data;

//     // Step 3: Validate the response (assuming a function called `validateResponse`)
//     const isValidResponse = validateResponse(googlePayResponse);
//     if (!isValidResponse) {
//       throw new Error('Invalid response received.');
//     }

//     // Step 4: Process the payment authorization
//     if (googlePayResponse.paymentStatus === 'AUTHORIZED') {
//       const paymentDetails = googlePayResponse.paymentDetails;

//       // Step 4.1: Call Acme Payments API to process the payment
//       const acmeResponse = await processPayment(paymentDetails);

//       // Step 5: Handle the payment status
//       if (acmeResponse.success) {
//         console.log('Payment successful! Transaction ID:', acmeResponse.transactionId);
//         // Update your application state, generate invoices, etc.
//       } else {
//         console.log('Payment failed:', acmeResponse.errorMessage);
//         // Handle payment failure accordingly
//       }
//     } else if (googlePayResponse.paymentStatus === 'DECLINED') {
//       console.log('Payment declined by Google Pay.');
//       // Handle payment declined accordingly
//     } else if (googlePayResponse.paymentStatus === 'ERROR') {
//       console.log('Error occurred during payment:', googlePayResponse.error);
//       // Handle payment error accordingly
//     } else {
//       console.log('Unknown payment status:', googlePayResponse.paymentStatus);
//       // Handle unknown payment status accordingly
//     }
//   } catch (error) {
//     console.error('Error processing Google Pay payment:', error);
//     // Handle the error appropriately
//   }
// }

// function validateResponse(response) {
//   // Perform necessary validation, including signature verification
//   // Return true if the response is valid, false otherwise
//   // Example implementation:
//   return true;
// }

// async function processPayment(paymentDetails) {
//   try {
//     // Step 4.1: Call Acme Payments API to process the payment
//     const response = await axios.post('https://acme-payments.com/process', paymentDetails);

//     // Simulating the response from Acme Payments API
//     return {
//       success: response.data.success,
//       transactionId: response.data.transactionId,
//       errorMessage: response.data.errorMessage,
//     };
//   } catch (error) {
//     console.error('Error processing payment with Acme Payments:', error);
//     throw new Error('Payment processing failed.');
//   }
// }

// createGooglePayRequest();
