# ⭐ BACKEND ANYWHERE FITNESS TT-175

✔️ deployed endpoints:

back end:
https://anywhere-fitness-tt-175.herokuapp.com/

✔️ repos:

front end: [https://github.com/bw-anywhere-fitness-tt175/front-end](https://github.com/bw-anywhere-fitness-tt175/front-end)

back end: [https://github.com/bw-anywhere-fitness-tt175/back-end](https://github.com/bw-anywhere-fitness-tt175/back-end)


## base url call to axios
```
 https://anywhere-fitness-tt-175.herokuapp.com/api
```

## api sanity check

### - GET "/"

request: `n/a`

response: `{"api": "up"}`

---

### LOGIN/REGISTER ENDPOINTS (does not require auth/[not restricted])

### [register]

### -  POST "/api/users/register"

📝 notes: 

```
A user cannot register with an e-mail address already in use.
A user must register as only either an instructor (1) or student (2). 
```

request: 

```
email: "sarahrose@test.com",
password: "test1234",
name: "sarah rose",
phone_number: "2015551313",
role_id: 1,

```

response: 

`"User registered succesfully!"`

### [login]

### -  POST "/api/users/login"

request: 
```
email: "sarahrose@test.com"
 password: "test1234"
```

response: 
```

```

### helper endpoints (does not require auth/[not restricted])

## LIST OF ROLES (i.e.: instructor or student/user**

📝 notes:
`instructor or student are only options`

```
instructor === 1
student === 2
```

### -  GET "/api/roles"

request: `n/a`

response: 

```
{
id: 1,
role_name: "instructor"
},
{
id: 2,
role_name: "student"
}
```

### -  GET "/api/categories"

request:`n/a`

response: 
```
{
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
}
```

### LIST OF AVAILABLE CLASSES

### - GET "/api/classes"

request:`n/a`

response: 
```
{
"class name": "Yoga by Aja",
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
"class name": "Spinning by Aja",
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
"class name": "Aerobics by Sarah",
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
"class name": "Zumba by Chad",
"class type": "zumba",
"start time": "2:00 PM",
"date": "7/1/2021",
"duration": "4.00",
"intensity": 5,
"location": "Baltimore",
"class size": 15,
"number of registrants": 7,
"instructor": "chad"
}
```

📝 notes:

### USER ENDPOINTS [restricted])

### [update user profile] [restricted[

### -  PUT "/api/users/:id"

📝 notes: 

```
:id is the id of the user profile you wish to edit.
Only the signed in user can edit their own profile. Must be logged in. 
```

request:
```
email: "sarahrose@test.com",
password: bcrypt.hashSync("test1234", 10),
name: "sarah rose",
phone_number: "2015551313",
role_id: 1,
```

response: 
```
"User was successfully updated"
```

### CLASSES ENDPOINTS 

#### [get single class] ⬇️ [not restricted]

### - GET "/api/classes/:id"

📝 notes: 

`:id paramater is the ID of the designated individual class`

request:`n/a`

response: 
``` 
[
{
class name: "Yoga by Aja",
class type: "yoga",
start time: "11:00 AM",
date: "5/1/2021",
duration: 1,
intensity: 3,
location: "Los Angeles",
class size: 20,
number of registrants: 1,
instructor: "aja blanco"
}
]
```

#### [get single class] ⬇️

### - GET "/api/classes/:id"

📝 notes: 

```:id paramater is the ID of the designated individual class```

request:`n/a`

response: 
``` 
[
{
class name: "Yoga by Aja",
class type: "yoga",
start time: "11:00 AM",
date: "5/1/2021",
duration: 1,
intensity: 3,
location: "Los Angeles",
class size: 20,
number of registrants: 1,
instructor: "aja blanco"
}
]
```


#### [update a class] ⬇️

### - POST "/api/classes/:id/addClass"

📝 notes: 

```
:id paramater is the ID of the logged in user.
Logged in user must be an instructor (1).
Only an instructor can add a new class.
Class_name must be unique. Cannot register the same class twice.
```

request:
```
class_name: "Aerobics by Sarah", // must be unique
start_time: "5:00 PM",
class_date: "5/13/2021",
duration: 3.0, // hours
intensity_level: 3,
location: "Cleveland",
max_class_size: 30,
instructor_id: 2,
category_id: 3,
```

response: 
``` 
[
{
class_name: "Aerobics by Sarah", // must be unique
start_time: "5:00 PM",
class_date: "5/13/2021",
duration: 3.0, // hours
intensity_level: 3,
location: "Cleveland",
max_class_size: 30,
instructor_id: 2,
category_id: 3,
}
]
```

#### [gets a list of all USERS registered per class] ⬇️ [not restricted]

### - GET "/api/classes/:classId/users"

📝 notes: 

`:id paramater is the ID of the designated individual class.`

request:`n/a`

response: 
``` 
{
class_id: 1,
name: "Yoga by Aja",
type: 1,
students: [
{
id: 1,
name: "chad diaz",
email: "chad@test.com",
phone: "2015551212"
},
{
id: 3,
name: "sarah guidry",
email: "sarah@test.com",
phone: "2015551414"
}
]
}
```


