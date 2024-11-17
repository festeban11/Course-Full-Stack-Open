const Countries = ({ countries = [] }) => (
    <>
    <div>
        {countries.map((country) => 
             <div key={country.name.official}>
                {country.name.common}
            </div>
        )}
    </div>
    </>
);

export default Countries;