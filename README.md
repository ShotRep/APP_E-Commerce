<h1 align="center">App - E-Commerce</h1>

<h3 align="center">The Modern Javascript Bootcamp Course (2021) part II Applications</h3>    

<!-- GETTING STARTED -->
## Getting Started
Part 2 of the modern bootcamp course, switching from classroom style to applied learning through the building of projects. 


## This will be a large project incorporating many of the technologies learned so far.
NodeJS Web Server using Express
Dynamic HTML through NodeJS
Forms & Parsing
For reusability we will also be adding an Admin app to service this website

## Project Approach & Architecture.
SEND: Dynamic web page -> Request -> Node JS Server -> File-based data store
RETURN: File-based data store -> Node JS Server -> HTML Doc -> Dynamic web page
## Project Start Stop Notes.
npm run dev 
Starts project
ctrl c
stops project

## Cookie Authentication Notes
Req -> Res: cookie, a small string of characters, include with each followup request.  Request with cookie.

## Hashing Algorithm - SHA256 is very popular
If the input string is the same it will always give back the same hash output.
You cannot reverse engineer the hash output
The main goal is to never store the password in our database, instead we store the hash output

## Salting Passwords
Password + Salt + Hashing Algo = unique hash output of [Hash.Salt]
ex. Password: 8c2b7052ac0cf5c11792eddbc83a519e5eca02473203279b0ed38f1d71a69c9c31f6f25a86bbe44069529349612146070bcf39d426796f3fca1a968bfc61b485.1cc0c4cf2b46c467


## Rainbow table attack
Malicious user will get a list of common passwords and calc the hash for these passwords.
Since hash outputs are always the same for the input string the password can still be figured out.


[MDN JS Web Docs - URL](https://developer.mozilla.org/en-US/docs/Web/javascript)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.