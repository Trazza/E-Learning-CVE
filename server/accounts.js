/*

// first, remove configuration entry in case service is already configured
Accounts.loginServiceConfiguration.remove({
  service: "google"
});
Accounts.loginServiceConfiguration.insert({
  service: "google",
  clientId: "810874460333-8vs1p9d1q1v3klm8s1rv3v4rdcq6kve8.apps.googleusercontent.com",
  secret: "hn-cvwZW38PaGKm24N-3SgmE"
});

*/

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




