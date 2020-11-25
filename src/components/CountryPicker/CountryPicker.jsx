import { FormControl, NativeSelect } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { fetchCountryes } from '../../api'
import style from './CountryPicker.module.css';


const CountryPicker = ({ handelCountryChange }) => {

    const [fCountryes, setFCountryes] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setFCountryes(await fetchCountryes());
        }
        fetchApi()
    }, [setFCountryes])
    return (
        <FormControl className={style.formControrl}>
            <NativeSelect defaultValue="" onChange={(e) => handelCountryChange(e.target.value)}>
                <option value=''>Global</option>
                {
                    fCountryes.map((name, i) => <option key={i} value={name}>{name}</option>)
                }
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
