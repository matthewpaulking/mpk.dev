const id = "how-to-manually-add-ssl-certificate-for-valet-and-linux.md";
						const collection = "post";
						const slug = "how-to-manually-add-ssl-certificate-for-valet-and-linux";
						const body = "\nAt work, our organization recently upgraded our SSL certificates. Unfortunately, this broke some stuff on our application servers. Suddenly I was getting cURL errors like this:\n\n`curl: (60) Peer's Certificate issuer is not recognized`.\n\nAfter a loooooong Google/ChatGPT session, I finally cobbled together a solution. Since I'm developing locally with Laravel Valet, and our application servers are using Linux, I needed a different solutions for each.\n\nIn our case, the certificate was from GoDaddy. Turns out, they have a repository of certificate files here: https://certs.godaddy.com/repository. The one I needed was an Intermediate Certificate. Get the `.pem` file on your machines, then run the following.\n\n## How to add the certificate file for Laravel Valet\n\nCopy the text of your `whatever.pem` file, and append to `/opt/homebrew/etc/openssl@1.1/cert.pem`. Do a `valet restart` and hopefully you're in good to go!\n\n## How to add the certificate file on Linux\n\n```sh\ncp whatever.pem /etc/pki/ca-trust/source/anchors/\nupdate-ca-trust extract\n```\n";
						const data = {title:"How to manually add an SSL Certificate for Valet and Linux.",description:"After our organization had updated our GoDaddy SSL certificates, anything using cURL started throwing errors.",publishDate:new Date(1695452400000),draft:true,tags:["bug-tales","ssl"]};
						const _internal = {
							type: 'content',
							filePath: "/Users/mpk/Sites/mpk.dev/src/content/post/how-to-manually-add-ssl-certificate-for-valet-and-linux.md",
							rawData: "\ntitle: How to manually add an SSL Certificate for Valet and Linux.\npublishDate: 23 Sep 2023\ndescription: After our organization had updated our GoDaddy SSL certificates, anything using cURL started throwing errors.\ntags: [\"bug-tales\", \"ssl\"]\ndraft: true",
						};

export { _internal, body, collection, data, id, slug };
