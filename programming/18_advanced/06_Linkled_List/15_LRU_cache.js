/* Problem: ✅✅✅✅ LRU Cache Implementation ✅✅✅✅

Design and implement a data structure for Least Recently Used (LRU) cache. 
It should support the following operations: get and put.

- get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
- put(key, value) - Set or insert the value if the key is not already present. 
                    When the cache reached its capacity, 
                    it should invalidate the least recently used item before inserting a new item.

The cache is initialized with a positive capacity.

Example 1:
Input:
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output: [null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation:
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // return -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4

Example 2:
Input:
["LRUCache", "put", "get", "put", "get", "get"]
[[1], [2, 1], [2], [3, 2], [2], [3]]
Output: [null, null, 1, null, -1, 2]

Explanation:
LRUCache lRUCache = new LRUCache(1);
lRUCache.put(2, 1); // cache is {2=1}
lRUCache.get(2);    // return 1
lRUCache.put(3, 2); // LRU key was 2, evicts key 2, cache is {3=2}
lRUCache.get(2);    // return -1 (not found)
lRUCache.get(3);    // return 2

Constraints:
- 1 <= capacity <= 3000
- 0 <= key <= 10^4
- 0 <= value <= 10^5
- At most 2 * 10^5 calls will be made to get and put.

Expected Time Complexity: O(1) for both get and put operations
Expected Auxiliary Space: O(capacity)
*/

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();

        // dummy head & tail to avoid edge cases
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // remove a node from DLL
    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    // insert node right after head (most recent position)
    _insert(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    get(key) {
        if (!this.map.has(key)) return -1;

        let node = this.map.get(key);
        this._remove(node);   // remove from current position
        this._insert(node);   // move to front
        return node.value;
    }

    put(key, value) {
        if (this.map.has(key)) {
            this._remove(this.map.get(key));
        }

        let node = new Node(key, value);
        this._insert(node);
        this.map.set(key, node);

        if (this.map.size > this.capacity) {
            // remove from back
            let lru = this.tail.prev;
            this._remove(lru);
            this.map.delete(lru.key);
        }
    }
}

/*🎯 CORE IDEA: Use DOUBLY LINKED LIST + HASH MAP combination to achieve O(1) operations. The DLL maintains access order (most recent at head, least recent at tail), while the hash map provides O(1) key lookup.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create dummy head and tail nodes
   - Connect head.next = tail, tail.prev = head
   - Initialize hash map for O(1) key lookup
   - Set capacity limit

2️⃣ GET OPERATION:
   - Check if key exists in hash map
   - If not found: return -1
   - If found: remove node from current position, insert at head (most recent)
   - Return node value

3️⃣ PUT OPERATION:
   - If key exists: remove existing node
   - Create new node with key-value pair
   - Insert at head (most recent position)
   - Add to hash map
   - If capacity exceeded: remove tail.prev (least recent)

4️⃣ HELPER OPERATIONS:
   - _remove(node): Remove node from DLL
   - _insert(node): Insert node after head (most recent)

🧠 WHY THIS APPROACH?
- DLL maintains access order efficiently
- Hash map provides O(1) key lookup
- Dummy nodes eliminate edge cases
- Head = most recent, tail = least recent

💡 KEY INSIGHTS:
- DLL + Hash Map = O(1) operations
- Most recent at head, least recent at tail
- Dummy nodes simplify edge case handling
- Remove + Insert = move to front
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:
📊 INPUT: capacity = 2, operations = [put(1,1), put(2,2), get(1), put(3,3), get(2), put(4,4), get(1), get(3), get(4)]

🎯 GOAL: Implement LRU Cache with O(1) get and put operations!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
capacity = 2
map = {}
head = Node(0,0) -> tail = Node(0,0)
head.next = tail, tail.prev = head

📋 OPERATION 1: put(1, 1)
- Key 1 not in map
- Create node(1,1)
- _insert(node): head -> node(1,1) -> tail
- map[1] = node(1,1)
- size = 1 <= capacity = 2 ✓

STATE: head -> (1,1) -> tail
MAP: {1: node(1,1)}

📋 OPERATION 2: put(2, 2)
- Key 2 not in map
- Create node(2,2)
- _insert(node): head -> node(2,2) -> node(1,1) -> tail
- map[2] = node(2,2)
- size = 2 <= capacity = 2 ✓

STATE: head -> (2,2) -> (1,1) -> tail
MAP: {1: node(1,1), 2: node(2,2)}

📋 OPERATION 3: get(1)
- Key 1 exists in map
- node = map[1] = node(1,1)
- _remove(node): head -> node(2,2) -> tail
- _insert(node): head -> node(1,1) -> node(2,2) -> tail
- Return node.value = 1

STATE: head -> (1,1) -> (2,2) -> tail
MAP: {1: node(1,1), 2: node(2,2)}
RETURN: 1

📋 OPERATION 4: put(3, 3)
- Key 3 not in map
- Create node(3,3)
- _insert(node): head -> node(3,3) -> node(1,1) -> node(2,2) -> tail
- map[3] = node(3,3)
- size = 3 > capacity = 2
- Remove LRU: tail.prev = node(2,2)
- _remove(node(2,2)): head -> node(3,3) -> node(1,1) -> tail
- map.delete(2)

STATE: head -> (3,3) -> (1,1) -> tail
MAP: {1: node(1,1), 3: node(3,3)}

📋 OPERATION 5: get(2)
- Key 2 not in map
- Return -1

RETURN: -1

📋 OPERATION 6: put(4, 4)
- Key 4 not in map
- Create node(4,4)
- _insert(node): head -> node(4,4) -> node(3,3) -> node(1,1) -> tail
- map[4] = node(4,4)
- size = 3 > capacity = 2
- Remove LRU: tail.prev = node(1,1)
- _remove(node(1,1)): head -> node(4,4) -> node(3,3) -> tail
- map.delete(1)

STATE: head -> (4,4) -> (3,3) -> tail
MAP: {3: node(3,3), 4: node(4,4)}

📋 OPERATION 7: get(1)
- Key 1 not in map
- Return -1

RETURN: -1

📋 OPERATION 8: get(3)
- Key 3 exists in map
- node = map[3] = node(3,3)
- _remove(node): head -> node(4,4) -> tail
- _insert(node): head -> node(3,3) -> node(4,4) -> tail
- Return node.value = 3

STATE: head -> (3,3) -> (4,4) -> tail
MAP: {3: node(3,3), 4: node(4,4)}
RETURN: 3

📋 OPERATION 9: get(4)
- Key 4 exists in map
- node = map[4] = node(4,4)
- _remove(node): head -> node(3,3) -> tail
- _insert(node): head -> node(4,4) -> node(3,3) -> tail
- Return node.value = 4

STATE: head -> (4,4) -> (3,3) -> tail
MAP: {3: node(3,3), 4: node(4,4)}
RETURN: 4

🏆 FINAL RESULT: [null, null, null, 1, null, -1, null, -1, 3, 4]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

INITIAL STATE:
head <-> tail
MAP: {}

AFTER put(1,1):
head <-> (1,1) <-> tail
MAP: {1: node(1,1)}

AFTER put(2,2):
head <-> (2,2) <-> (1,1) <-> tail
MAP: {1: node(1,1), 2: node(2,2)}

AFTER get(1):
head <-> (1,1) <-> (2,2) <-> tail
MAP: {1: node(1,1), 2: node(2,2)}

AFTER put(3,3):
head <-> (3,3) <-> (1,1) <-> tail
MAP: {1: node(1,1), 3: node(3,3)}

AFTER put(4,4):
head <-> (4,4) <-> (3,3) <-> tail
MAP: {3: node(3,3), 4: node(4,4)}

FINAL STATE:
head <-> (4,4) <-> (3,3) <-> tail
MAP: {3: node(3,3), 4: node(4,4)}

─────────────────────────────────────────

📊 SECOND EXAMPLE: capacity = 1

🔍 PROCESS:

INITIALIZATION:
capacity = 1
head <-> tail
MAP: {}

put(2,1):
head <-> (2,1) <-> tail
MAP: {2: node(2,1)}

get(2):
head <-> (2,1) <-> tail
MAP: {2: node(2,1)}
RETURN: 1

put(3,2):
head <-> (3,2) <-> tail
MAP: {3: node(3,2)}

get(2):
Key 2 not in map
RETURN: -1

get(3):
head <-> (3,2) <-> tail
MAP: {3: node(3,2)}
RETURN: 2

🏆 FINAL RESULT: [null, null, 1, null, -1, 2]

🔍 WHY THIS WORKS:
1️⃣ DLL maintains access order efficiently
2️⃣ Hash map provides O(1) key lookup
3️⃣ Dummy nodes eliminate edge cases
4️⃣ Head = most recent, tail = least recent
5️⃣ Remove + Insert = move to front

💡 KEY INSIGHT:
The combination of DLL (for order) and Hash Map (for lookup)
achieves O(1) operations for both get and put!

🎯 TIME COMPLEXITY ANALYSIS:
- get(key): O(1) - hash map lookup + DLL operations
- put(key, value): O(1) - hash map operations + DLL operations
- _remove(node): O(1) - direct pointer manipulation
- _insert(node): O(1) - direct pointer manipulation

🎯 SPACE COMPLEXITY ANALYSIS:
- Hash map: O(capacity) - stores key to node mapping
- DLL: O(capacity) - stores actual nodes
- Total: O(capacity)

🎯 EDGE CASES HANDLED:
- Empty cache
- Single element cache
- Capacity overflow
- Key not found
- Duplicate key insertion

🎯 ALGORITHM CORRECTNESS:
- Guaranteed O(1) operations
- Maintains LRU order correctly
- Handles capacity overflow properly
- Dummy nodes eliminate edge cases

🎯 DATA STRUCTURE CHOICES:
- DLL: Maintains access order efficiently
- Hash Map: Provides O(1) key lookup
- Dummy nodes: Simplify edge case handling
- Head/Tail: Clear most/least recent positions

🎯 LRU EVICTION STRATEGY:
- Most recent: Always at head
- Least recent: Always at tail.prev
- Eviction: Remove tail.prev when capacity exceeded
- Access: Move accessed node to head

🎯 IMPLEMENTATION DETAILS:
- _remove: Update prev.next and next.prev
- _insert: Insert after head, update 4 pointers
- Dummy nodes: Eliminate null checks
- Hash map: Key to node reference mapping
*/
