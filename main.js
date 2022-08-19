// name, dpi, birthDate, address
/* function comparation(name) {
  let asciiName = []
  for (let i = 0; i < name.length; i++) {
    asciiName.push(name.charCodeAt(i))
  }

  return asciiName
} */
const data = [
{"name":"diego","dpi":12345678,"dateBirth":"01/01/1900","address":"guatemala"},
{"name":"max","dpi":12345679,"dateBirth":"02/01/1900","address":"guatemala"},
{"name":"max","dpi":12345679,"dateBirth":"02/02/1900"},
{"name":"max","dpi":12345679,"address":"el salvador"},
{"name":"diego","dpi":12345621,"dateBirth":"02/01/1900","address":"guatemala"},
{"name":"diego","dpi":12345622,"dateBirth":"03/01/1900","address":"guatemala"},
{"name":"diego","dpi":12345622,"dateBirth":"05/01/1900"},
{"name":"diego","dpi":12345678}]



/* const Node = {
  "person": null,
  "left": null,
  "right": null,
  "height": 1
  // nameAscii = compare(person.name)
} */

let mainRoot = null
let sortedByName = true

const compareByName = (person1, bool, person2) => {
  if (bool === '==') {
    return person1.name == person2.name
  }

  if (bool === '>') {
    return person1.name > person2.name
  }

  if (bool === '<') {
    return person1.name < person2.name
  }
}

const compareByDPI = (person1, bool, person2) => {
  if (bool === '==') {
    return person1.dpi == person2.dpi
  }

  if (bool === '>') {
    return person1.dpi > person2.dpi
  }

  if (bool === '<') {
    return person1.dpi < person2.dpi
  }
}

const insert = (key) => {
  const func = sortedByName ? compareByName : compareByDPI
  mainRoot = insertNode(mainRoot, key, func)
}

const remove = (key) => {
  sortByDPI()

  const func = sortedByName ? compareByName : compareByDPI
  mainRoot = removeNode(mainRoot, key, func)
}

const update = (name, dpi) => {
  // TODO:

}

const search = (name) => {
  sortByName()
  const key = { name }
  
  // TODO:
}

const insertNode = (root, key, compare) => {
  print()
  if (root == null) {
    return Node = {
      "person": key,
      "left": null,
      "right": null,
      "height": 1
    }
  }
  if (compare(key, '<', root.person)) {
    root.left = insertNode(root.left, key, compare)
  }
  else {
    root.right = insertNode(root.right, key, compare)
  }

  // Balance
  root.height = 1 + Math.max(getHeight(root.left), getHeight(root.right))
  const balanceFactor = getBalance(root)

  if (balanceFactor > 1) {
    if (compare(key, '<', root.left.person)) {
      return rightRotation(root)
    }
    else {
      root.left = leftRotation(root.left)
      return rightRotation(root)
    }
  }

  if (balanceFactor < -1) {
    if (compare(key, '>', root.right.person)) {
      return leftRotation(root)
    }
    else {
      root.right = rightRotation(root.right)
      return leftRotation(root)
    }
  }

  return root
}

const removeNode = (root, key, compare) => {
  if (root == null) {
    return root
  }

  if (compare(key, '<', root.person)) {
    root.left = removeNode(root.left, key, compare)
  }
  else if (compare(key, '>', root.person)) {
    root.right = removeNode(root.right, key, compare)
  }
  else {
    if (root.left == null) {
      const temp = root.right
      root = null
      return temp
    }
    else if (root.right == null) {
      const temp = root.left
      root = null
      return temp
    }

    const temp = getMinValueNode(root.right)
    root.person = temp.person
    root.right = removeNode(root.right, temp.person, compare)
  }

 if (root == null) return root

  // Balance
  root.height = 1 + Math.max(getHeight(root.left), getHeight(root.right))  
  balanceFactor = getBalance(root)

  if (balanceFactor > 1) {
    if (getBalance(root.left) >= 0) {
      return rightRotation(root)
    }
    else {
      root.left = leftRotation(root.left)
      return rightRotation(root)
    }
  }
  if (balanceFactor < -1) {
    if (getBalance(root.right) <= 0) {
      return leftRotation(root)
    }
    else {
      root.right = rightRotation(root.right)
      return leftRotation(root)
    }
  }
  return root
}

const searchNode = () => {
  
}

const getHeight = (root) => {
  if (root == null) return 0
  
  return getMinValueNode(root.left)
}

const getBalance = (root) => {
  if (root == null) return 0
  return getHeight(root.left) - getHeight(root.right)
}

const leftRotation = (z) => {
  y = z.right
  T2 = y.left
  y.left = z
  z.right = T2
  z.height = 1 + Math.max(getHeight(z.left), getHeight(z.right))
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right))
  return y
}

const rightRotation = (z) => {
  y = z.left
  T3 = y.right
  y.right = z
  z.left = T3
  z.height = 1 + Math.max(getHeight(z.left), getHeight(z.right))
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right))
  return y
}

const getMinValueNode = (root) => {
  if (root == null || root.left == null) return root
  return getMinValueNode(root.left)
}

const sortByName = () => {
  const items = inOrder(mainRoot)
  mainRoot = null
  sortedByName = true
  
  items.forEach(x => {
    insert(x)
  })
}

const sortByDPI = () => {
  const items = inOrder(mainRoot)
  mainRoot = null
  sortedByName = false
  
  items.forEach(x => {
    insert(x)
  })
}

const inOrder = (root, items = []) => {
  if (root != null) {
    inOrder(root.left, items)
    items.push(root.person)
    inOrder(root.right, items)
  }

  return items
}

const print2 = () => {
  print(mainRoot)
}

const print = (root) => {
  if (root != null) {
    print(root.left)
    console.log(root.person)
    print(root.right)
  }
}


/* sortByDPI()
data.forEach(x => {
  insert(x)
})
print2()


const doso = () => {
  data.forEach(x => {
    remove(x.name, x.dpi)
  })
}
doso()
print2()

setTimeout(() => {
  print2()
 }, 5000);
 */

 const dict = {
  "INSERT": insert,
  "PATCH": update,
  "DELETE": remove,
}

async function doStuff() {
  fetch('data.csv')
    .then(response => response.text())
    .then(data => {
      data = data.split('\r\n')
        .map(x => {
          const text = x.split(';')
          return [text[0], JSON.parse(text[1])]
        })
      
      // do stuff here
      data.forEach((item) => {
        const operationString = item[0]
        const person = item[1]
        dict[operationString](person)
        print2()
      })
      print2()
    })
}

doStuff()