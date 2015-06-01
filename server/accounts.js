
//************* configurazione google Account ******************************************************* 
// per verificale collegari con le credenziali di gsa.lab.international@gmail.com a: 
//      "https://console.developers.google.com/project/810874460333/apiui/credential"
//
// ATTENZIONE
// redirect_uri:  http://localhost:3000 
//****************************************************************************************
ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      clientId: "810874460333-8vs1p9d1q1v3klm8s1rv3v4rdcq6kve8.apps.googleusercontent.com",
      loginStyle: "popup",
      secret: "hn-cvwZW38PaGKm24N-3SgmE"
    }
  }
);




