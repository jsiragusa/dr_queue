### Examples
Assuming items are by default, originating from left to right, FIFO.


To create a new queue named test and push an item onto that queue:

```
curl -X POST \
  http://localhost:8000/api/queue/test \
  -H 'Authorization: Bearer Go' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"asin": "B07DJ1SS29"
}'
```
Get the first off item from the left of a queue named test (known in Redis as rpop):
```
curl -X POST \
  http://localhost:8000/api/queue/test/pop \
  -H 'Authorization: Bearer Go' \
  -H 'Content-Type: application/json'
```

Get the last 3 items (sorted by FIFO) off a queue named test:
```
curl -X POST \
  http://localhost:8000/api/queue/test/last/3 \
  -H 'Authorization: Bearer Go' \
  -H 'Content-Type: application/json'
```

To empty out a the test queue:
```
curl -X POST \
  http://localhost:8000/api/queue/test/reset \
  -H 'Authorization: Bearer Go' \
  -H 'Content-Type: application/json'
```

Pop an item off from the front the queue named test:
```
curl -X POST \
  http://localhost:8000/api/queue/test/pop \
  -H 'Authorization: Bearer Go' \
  -H 'Content-Type: application/json'
```

Pop an item off the end of the (FILO) queue named test:
```
curl -X POST \
  http://localhost:8000/api/queue/test/pop_right \
  -H 'Authorization: Bearer Go' \
  -H 'Content-Type: application/json'
```

To find the length of test queue:
```
curl -X GET \
  http://localhost:8000/api/queue/test/length \
  -H 'Authorization: Bearer Go' \
  -H 'Content-Type: application/json'
```

To push an item to the right side of the test queue:
```
curl -X GET \
  http://localhost:8000/api/queue/test/push \
  -H 'Authorization: Bearer Go' \
  -H 'Content-Type: application/json'
```

To get the first item (to the left) in test queue:
```
curl -X GET \
  http://localhost:8000/api/queue/test/length \
  -H 'Authorization: Bearer Go' \
  -H 'Content-Type: application/json'
```

To get the first 3 items (to the left) of queue:
```
curl -X GET \
  http://localhost:8000/api/queue/test/first/3 \
  -H 'Authorization: Bearer Go' \
  -H 'Content-Type: application/json'
```

To select a range of items from index position 3 to 5
```
curl -X GET \
  http://localhost:8000/api/queue/test/range/3/6 \
  -H 'Authorization: Bearer Go' \
  -H 'Content-Type: application/json'
```

<sub>
Note: Range returns a subset of the list from left to right
The index is zero based, and the amount of items
is equal to the stop minus the start index (if there's enough get items in the list to return).
This is similar to Python's range command and unlike Redis' native
range command, which includes the last stop index.
</sub>
