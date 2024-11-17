const Countries = ({ countries, setShowCountry}) => (
    <>
    <div>
        {countries.map((country) => 
             <div key={country.name.official}>
                {country.name.common}
                {<button onClick={() => setShowCountry([country])}>show</button>}
            </div>
        )}
    </div>
    </>
);

export default Countries;