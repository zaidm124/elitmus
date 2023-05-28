# E-Litmus Assignment Round
### Name: Zaid Bhimala
### Candidate ID: 5350013

### Hosted Website: https://zaidbhimala.me
### Admin Username: admin
### Admin Password: admin@elitmus
<br/>

# Topic : Puzzle Game / Treasure Hunt


# Features

```
 There are 5 rounds in the hunt.

 There are 2 dead ends, one dead end is at Round 3 and other one is at Round 5.

 The Game will be over if the user answers incorrectly twice at round 3 or 5, and will not be able to take part further in the game.

 There is a leadeboard ranked based on number of rounds and least time taken to complete the rounds.

 The Admin Dashboard has Pie Graph for average time taken for each round.

 The Admin Dashboard has a bar graph for number of users completing each round.

 The feature to restart the game was implemented but later not used because the user might just get a better score everytime since the questions are always same.

 There is JWT AUthentication, so user cannot access the website if not logged in.

 The time at which user started a round is store in the MySQL Database.
```

# Logic Used to asess soft skills

```
After each round a part of the story is revealed

At the final round, user is supossed to compile the whole story and answer who the killer is.

Round 1 has a QR Code which will redirect to an instagram post and will lead to a PDF for the first part of the story. This round will asess the curiosity of the user to find the clues of the murder story.

Round 2 has images where user has to spot the difference between 2 of them.
This round will asess the eye for detail.

Round 3 has a riddle, which on solving will lead to another PDF to give next part of the story. 
The solution of the riddle is fatherinlaw.
This round will assess the IQ of the user.

Round 4 has a memory game, which will assess the memory of the user.

Round 5 is where the user has to read the whole story and answer the killer, and will get only two attempts to find the answer.
This round will assess the perseverence of the user to find the killer by reading the whole story.

The answer is angela for round 5.


```

## 🛠 Tech Used 

### Frontend
```
 
 Tech Stack Used: React js, MUI, Redux

 Deployed and hosted on Netlify
 
 Deployed on https://zaidbhimala.me/

```

### Backend
```

Tech Stack Used: Node JS, 

Database Used: MySQL running on google cloud 

Backend Deployed on Google Cloud using cloud functions

Deployed backend URL: https://us-central1-lofty-seer-386909.cloudfunctions.net/gcp-func-novus

JWT Authentication: The User cannot access the game unless he/she is not logged in.



```