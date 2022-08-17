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



class Node {
  constructor(person) {
    this.person = person
    //this.nameAscii = compare(person.name)
    this.left = null
    this.right = null
    this.height = 1
  }
}

class AVLtree {
  constructor() {
    this.root = null
    this.compareByName = (person1, bool, person2) => {
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
    this.compareByDPI = (person1, bool, person2) => {
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
    this.sortedByName = true
  }

  insert(key) {
    const func = this.sortedByName ? this.compareByName : this.compareByDPI
    this.root = this.#insertNode(this.root, key, func)
  }

  delete(name, dpi) {
    const key = { name, dpi }
    this.sortByDPI()

    const func = this.sortedByName ? this.compareByName : this.compareByDPI
    this.root = this.#deleteNode(this.root, key, func)
  }

  update(name, dpi) {
    // TODO:

  }

  search(name) {
    this.sortByName()
    const key = { name }
    
    // TODO:
  }

  #insertNode(root, key, compare) {
    this.print()
    if (root == null) {
      return new Node(key)
    }
    if (compare(key, '<', root.person)) {
      root.left = this.#insertNode(root.left, key, compare)
    }
    else {
      root.right = this.#insertNode(root.right, key, compare)
    }

    // Balance
    root.height = 1 + Math.max(this.#getHeight(root.left), this.#getHeight(root.right))
    const balanceFactor = this.#getBalance(root)

    if (balanceFactor > 1) {
      if (compare(key, '<', root.left.person)) {
        return this.#rightRotation(root)
      }
      else {
        root.left = this.#leftRotation(root.left)
        return this.#rightRotation(root)
      }
    }

    if (balanceFactor < -1) {
      if (compare(key, '>', root.right.person)) {
        return this.#leftRotation(root)
      }
      else {
        root.right = this.#rightRotation(root.right)
        return this.#leftRotation(root)
      }
    }

    return root
  }

  #deleteNode(root, key, compare) {
    if (root == null) {
      return root
    }

    if (compare(key, '<', root.person)) {
      root.left = this.#deleteNode(root.left, key)
    }
    else if (compare(key, '>', root.person)) {
      root.right = this.#deleteNode(root.right, key)
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

      temp = this.#getMinValueNode(root.right)
      root.person = temp.person
      root.right = this.#deleteNode(root.right, temp.person)
    }

    // TODO: test this bool
    /* if root is None:
        return root
    */
   if (root == null) return root
  
    // Balance
    root.height = 1 + Math.max(this.#getHeight(root.left), this.#getHeight(root.right))  
    balanceFactor = this.#getBalance(root)
  
    if (balanceFactor > 1) {
      if (this.#getBalance(root.left) >= 0) {
        return this.#rightRotation(root)
      }
      else {
        root.left = this.#leftRotation(root.left)
        return this.#rightRotation(root)
      }
    }
    if (balanceFactor < -1) {
      if (this.#getBalance(root.right) <= 0) {
        return this.#leftRotation(root)
      }
      else {
        root.right = this.#rightRotation(root.right)
        return this.#leftRotation(root)
      }
    }
    return root
  }

  #searchNode() {
    
  }

  #getHeight(root) {
    if (root == null) return 0
    
    return this.#getMinValueNode(root.left)
  }

  #getBalance(root) {
    if (root == null) return 0
    return this.#getHeight(root.left) - this.#getHeight(root.right)
  }

  #leftRotation(z) {
    y = z.right
    T2 = y.left
    y.left = z
    z.right = T2
    z.height = 1 + Math.max(this.#getHeight(z.left), this.#getHeight(z.right))
    y.height = 1 + Math.max(this.#getHeight(y.left), this.#getHeight(y.right))
    return y
  }

  #rightRotation(z) {
    y = z.left
    T3 = y.right
    y.right = z
    z.left = T3
    z.height = 1 + Math.max(this.#getHeight(z.left), this.#getHeight(z.right))
    y.height = 1 + Math.max(this.#getHeight(y.left), this.#getHeight(y.right))
    return y
  }

  #getMinValueNode(root) {
    if (root == null || root.left == null) return root
    return this.#getMinValueNode(root.left)
  }

  sortByName() {
    items = this.#inOrder(this.root)
    this.root = null
    this.sortedByName = true
    
    items.forEach(x => {
      this.insert(x)
    })
  }
  
  sortByDPI() {
    const items = this.#inOrder(this.root)
    this.root = null
    this.sortedByName = false
    
    items.forEach(x => {
      this.insert(x)
    })
  }

  #inOrder(root) {
    const items = []
    if (root != null) {
      this.#inOrder(root.left)
      items.push(root.person)
      this.#inOrder(root.right)
    }

    return items
  }

  print2() {
    this.print(this.root)
    console.log('done', this.root)
  }

  print(root) {
    if (root != null) {
      this.print(root.left)
      console.log(root.person)
      this.print(root.right)
    }
  }
}

/* const tree = new AVLtree
tree.sortByDPI()
data.forEach(x => {
  tree.insert(x)
})


const doso = () => {
  data.forEach(x => {
    tree.delete(x.name, x.dpi)
  })

}
doso()

setTimeout(() => {
  console.log('start')
  tree.print2()
  console.log(tree.root)
  tree.print2()
 }, 5000); */
