import { useState } from "react";

export default function ContractForm() {

    const [contractAddress, setContractAddress] = useState("");

    const handleSubmit = (event: any) => {
        console.log(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter Contract Address"
                value={"contractAddress"}
                onChange={(e) => setContractAddress(e.target.value)}
            />
            <input type="submit" value="Submit" />
        </form>
    );
}