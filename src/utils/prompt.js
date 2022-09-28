module.exports = [
  {
    name: 'version',
    message: 'version(1.0.0)'
  },
  {
    name: 'description',
    message: 'description'
  },
  {
    name: 'author',
    message: 'author'
  },
  {
    type: 'list',
    name: 'preset',
    message: 'Please pick a preset:',
    choices: [
        {
            name: 'Default (Vue2)',
            value: 'vue2',
        },
        {
            name: 'Default (Vue3)',
            value: 'vue3',
        }
    ]
  }
]
