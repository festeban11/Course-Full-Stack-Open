const Filter = (props) => (
    <>
     <form>
        <div>
      filter shown with:
      <input
          value={props.searchName}
          onChange={props.handleSearchCountry}
        />  
        </div>
        </form>

    </>
)

export default Filter
