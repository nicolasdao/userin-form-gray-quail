const fs = require('fs')
const { join } = require('path')
const { version } = require('./package.json')

const DOC_LOCATION = join(__dirname, './README.md')

fs.readFile(DOC_LOCATION, (err, text) => {
	const doc = text.toString()
	const newVersion = `userin-form-gray-quail@${version}`
	const regex = /userin-form-gray-quail@[0-9]+\.[0-9]+\.[0-9]+/g
	const versions = (doc.match(regex) || []).reduce((acc,v) => {
		if (!acc[v]) {
			acc[v] = true
			acc.data.push(v)
		}
		return acc
	}, { data:[] }).data

	const l = versions.length
	if (l > 0) {
		console.log(`${l} version${l > 1 ? 's' : ''} found. Replacing ${l > 1 ? 'them' : 'it'} now with '${newVersion}'`)
		const newDoc = doc.replace(regex, newVersion)
		fs.writeFile(DOC_LOCATION, newDoc, err => {
			if (err) 
				console.log(`Ooops, something went wrong: ${err.message}.`)
			else
				console.log(`README.md package version successfully updated to '${newVersion}'`)
		})
	} else 
		console.log('No versions found in the README.md.')
})