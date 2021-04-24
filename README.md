# ⭐ BACKEND ANYWHERE FITNESS TT-175

✔️ deployed endpoints:

back end:
https://anywhere-fitness-tt-175.herokuapp.com/

✔️ repos:

front end: [https://github.com/bw-anywhere-fitness-tt175/front-end](https://github.com/bw-anywhere-fitness-tt175/front-end)

back end: [https://github.com/bw-anywhere-fitness-tt175/back-end](https://github.com/bw-anywhere-fitness-tt175/back-end)

## api sanity check

### - GET "/"

request: `n/a`

response: `{"api": "up"}`

---

### helper endpoints (does not require auth/[not restricted])

## LIST OF ROLES (i.e.: instructor or student/user**

📝 NOTES:
<em>instructor or student are only options</em><br>
```
instructor === 1
student === 2
```

### -  GET "/api/roles"

request: `n/a`

response: 

```
`{
id: 1,
role_name: "instructor"
},
{
id: 2,
role_name: "student"
}`
```

### -  GET "/api/categories"

request:`n/a`

response: 
```
`{
id: 1,
cat_name: "yoga",
number_visits: 5
},
{
id: 2,
cat_name: "spinning",
number_visits: 5
},
{
id: 3,
cat_name: "aerobics",
number_visits: 8
},
{
id: 4,
cat_name: "zumba",
number_visits: 7
}`
```

### LIST OF AVAILABLE CLASSES

### - GET "/api/classes"

request:`n/a`

response: 
```
`{
"class_name": "Yoga by Aja",
"class type": "yoga",
"start time": "11:00 AM",
"date": "5/1/2021",
"duration": "1.00",
"intensity": 3,
"location": "Los Angeles",
"class size": 20,
"number of registrants": 8,
"instructor": "aja"
},
{
"class_name": "Spinning by Aja",
"class type": "spinning",
"start time": "12:00 AM",
"date": "6/5/2021",
"duration": "2.00",
"intensity": 3,
"location": "Phoenix",
"class size": 10,
"number of registrants": 5,
"instructor": "aja"
},
{
"class_name": "Aerobics by Sarah",
"class type": "aerobics",
"start time": "5:00 PM",
"date": "5/13/2021",
"duration": "3.00",
"intensity": 3,
"location": "Cleveland",
"class size": 30,
"number of registrants": 10,
"instructor": "sarah"
},
{
"class_name": "Zumba by Chad",
"class type": "zumba",
"start time": "2:00 PM",
"date": "7/1/2021",
"duration": "4.00",
"intensity": 5,
"location": "Baltimore",
"class size": 15,
"number of registrants": 7,
"instructor": "chad"
}`
```

📝 notes:


