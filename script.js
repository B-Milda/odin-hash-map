let loadFactor = 0.75;

class HashMap {
  constructor() {
    this.buckets = [];
    for (let i = 0; i < 15; i++) {
      this.buckets.push([]);
    }
  }

  newNode(key, value) {
    return {
      key: key,
      value: value,
      hashedKey: this.hash(key),
      nextNode: null,
    };
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }
    return hashCode;
  }

  set(key, value) {
    const node = this.newNode(key, value);

    if (this.buckets[node.hashedKey].length === 0) {
      this.buckets[node.hashedKey].push(node);
    } else {
      for (let i = 0; i < this.buckets[node.hashedKey].length; i++) {
        if (this.buckets[node.hashedKey][i].key === node.key) {
          this.buckets[node.hashedKey][i].value = node.value;
          return;
        }
      }
      this.buckets[node.hashedKey][
        this.buckets[node.hashedKey].length - 1
      ].nextNode = node.key;
      this.buckets[node.hashedKey].push(node);
    }

    /* Grow Buckets */
    if (this.length() / this.buckets.length >= loadFactor) {
      const bucketsLength = this.buckets.length;
      for (let i = 0; i < bucketsLength; i++) {
        this.buckets.push([]);
      }
    }
  }

  get(key) {
    const hashedKey = this.hash(key);
    for (let i = 0; i < this.buckets[hashedKey].length; i++) {
      if (this.buckets[hashedKey][i].key === key) {
        return this.buckets[hashedKey][i].value;
      }
    }
  }

  has(key) {
    const hashedKey = this.hash(key);
    for (let i = 0; i < this.buckets[hashedKey].length; i++) {
      if (this.buckets[hashedKey][i].key === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    if (this.has(key)) {
      const hashedKey = this.hash(key);
      for (let i = 0; i < this.buckets[hashedKey].length; i++) {
        if (this.buckets[hashedKey][i].key === key) {
          this.buckets[hashedKey].splice([i], 1);

          if (this.buckets[hashedKey].length > 0) {
            
            if (this.buckets[hashedKey].length === i) {
              this.buckets[hashedKey][i - 1].nextNode = null;

            } else if (this.buckets[hashedKey].length >= 3) {
              this.buckets[hashedKey][i - 1].nextNode =
                this.buckets[hashedKey][i + 1].key;
            }
          }
        }
      }
    } else {
      return false;
    }
  }

  length() {
    let sum = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      sum += this.buckets[i].length;
    }
    return sum;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) this.buckets[i] = [];
  }

  keys() {
    const cleanedArray = this.buckets.filter((subArray) => subArray.length > 0);
    let keys = [];
    for (let i = 0; i < cleanedArray.length; i++) {
      for (let u = 0; u < cleanedArray[i].length; u++) {
        keys.push(cleanedArray[i][u].key);
      }
    }
    return keys;
  }

  values() {
    const cleanedArray = this.buckets.filter((subArray) => subArray.length > 0);
    let values = [];
    for (let i = 0; i < cleanedArray.length; i++) {
      for (let u = 0; u < cleanedArray[i].length; u++) {
        values.push(cleanedArray[i][u].value);
      }
    }
    return values;
  }

  entries() {
    const cleanedArray = this.buckets.filter((subArray) => subArray.length > 0);
    let entries = [];
    for (let i = 0; i < cleanedArray.length; i++) {
      for (let u = 0; u < cleanedArray[i].length; u++) {
        entries.push([cleanedArray[i][u].key, cleanedArray[i][u].value]);
      }
    }
    return entries;
  }
}

const test = new HashMap()

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
