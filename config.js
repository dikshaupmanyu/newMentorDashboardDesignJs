const twitter = require('twitter-lite');

exports.newClient = function (subdomain = 'api') {
    return new twitter({
        subdomain,
    consumer_key: 'va2z3kxakH4Ieny88JlP09KJI',
    consumer_secret: 'SyuSOyHgHcsmEopxGIWLBK9OuF6koJcAXIWc1QG6acHOvyDvVX',
    access_token_key: '3023127157-xKrS1a7Y8oPpWPPqqnKbAWo5Ok3eBstiT0tUWWG',
    access_token_secret: 'a0hT7atCnfZKj5EB2VkGWMO9gziKQ1MCYlnJInq1y2w7o'
    });
}
