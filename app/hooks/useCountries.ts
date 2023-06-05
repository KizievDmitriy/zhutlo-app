import countries from 'world-countries';

const formatedCoutries = countries.map((countrie) => ({   //return obj
	value: countrie.cca2,
	label: countrie.name.common,
	flag: countrie.flag,
	latlng: countrie.latlng,
	region: countrie.region
}));

const useCountries = () => {
	const getAll = formatedCoutries;

	const getByValue = (value: string) => {
		return formatedCoutries.find((item) => item.value === value);
	}

	return {
		getAll,
		getByValue
	}
}

export default useCountries