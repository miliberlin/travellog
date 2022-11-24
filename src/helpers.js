export function getDates (dateArray) {
	if (dateArray.length === 1) return dateArray[0]

	let string = ""

	for (let i = 0; i < dateArray.length; i++) {
		string += dateArray[i]
		if (i + 1 !== dateArray.length) string += ", "
	}

	return string
}