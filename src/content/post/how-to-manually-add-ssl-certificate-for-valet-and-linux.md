---
title: How to manually add an SSL Certificate for Valet and Linux.
publishDate: 23 Sep 2023
description: After our organization had updated our GoDaddy SSL certificates, anything using cURL started throwing errors.
tags: ["bug-tales", "ssl"]
draft: true
---

At work, our organization recently upgraded our SSL certificates. Unfortunately, this broke some stuff on our application servers. Suddenly I was getting cURL errors like this:

`curl: (60) Peer's Certificate issuer is not recognized`.

After a loooooong Google/ChatGPT session, I finally cobbled together a solution. Since I'm developing locally with Laravel Valet, and our application servers are using Linux, I needed a different solutions for each.

In our case, the certificate was from GoDaddy. Turns out, they have a repository of certificate files here: https://certs.godaddy.com/repository. The one I needed was an Intermediate Certificate. Get the `.pem` file on your machines, then run the following.

## How to add the certificate file for Laravel Valet

Copy the text of your `whatever.pem` file, and append to `/opt/homebrew/etc/openssl@1.1/cert.pem`. Do a `valet restart` and hopefully you're in good to go!

## How to add the certificate file on Linux

```sh
cp whatever.pem /etc/pki/ca-trust/source/anchors/
update-ca-trust extract
```
