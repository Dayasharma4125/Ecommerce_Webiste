import https from "https"
import PaytmChecksum from "paytmchecksum"

var paytmParams = {};

paytmParams.body = {
    "requestType"   : "Payment",
    "mid"           : "HURilw10817958545037",
    "websiteName"   : "Store ",
    "orderId"       : "ORDERID_98765",
    "callbackUrl"   : "https://localhost:5173/",
    "txnAmount"     : {
        "value"     : "1.00",
        "currency"  : "INR",
    },
    "userInfo"      : {
        "custId"    : "CUST_001",
    },
};
function payment(req,res){
    const mid="HURilw10817958545037"
    const orderid=1001
    const url1=`https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${mid}}&orderId=${orderid}`
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), ).then(function(checksum){
        paytmParams.head = {
            "signature"    : checksum
        };
        var post_data = JSON.stringify(paytmParams);
    
        var options = {
    
            /* for Staging */
            hostname: 'securegw-stage.paytm.in',
    
            /* for Production */
            // hostname: 'securegw.paytm.in',
    
            port: 443,
            path: '/theia/api/v1/initiateTransaction?mid=YOUR_MID_HERE&orderId=ORDERID_98765',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };
    
        var response = "";
        var post_req = https.request(options, function(post_res) {
            post_res.on('data', function (chunk) {
                response += chunk;
            });
    
            post_res.on('end', function(){
                console.log('Response: ', response);
            });
        });
    
        post_req.write(post_data);
        post_req.end();
    });
}