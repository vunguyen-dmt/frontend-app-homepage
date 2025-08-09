import React, { useState, useEffect } from "react";
import "./SearchFilter.scss";
import { OverlayTrigger, Button, Popover, Form } from "@openedx/paragon"

const SearchFilter = ({data, nameFilter, type}) => {
    const [value, setValue] = useState("");
    const [showPopover, setShowPopover] = useState(false); // Toggle div visibility

    const handleChange = (e) => {
        const value = e.target.value;
        setValue(value);

        if (type == "unit") {
            window.location.href = `/courses/?page=1&language=&org=${value}&run=`
        }
        else if (type == "semester") {
            window.location.href = `/courses/?page=1&language=&org=&run=${value}`
        }
    }

    useEffect(() => {
        setTimeout(() => {
            document.querySelectorAll('.search-common-course .popover-button').forEach(function(elem) {
                elem.addEventListener('mouseover', () => {
                    console.log(elem.textContent)
                    if (elem.textContent == nameFilter) {
                        setShowPopover(true);
                    }
                });
            });
        });
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            const popoverElement = document.querySelector('.popover');
            // If the popover is open and click target is not inside it
            if (showPopover && popoverElement && !popoverElement.contains(event.target)) {
                setShowPopover(false);
            }
        };
        // Attach listener on mount
        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopover]);

    const popover = (
        <Popover className="popover-positioned-bottom pop-on-mouseover" placement="auto">
            <Popover.Content className={type=="unit" ? "popover-content-unit" : "popover-content-semester"}>
                <Form.Group>
                    <Form.RadioSet
                        name=""
                        onChange={handleChange}
                        value={value}
                    >
                        {
                            data.map(item => (
                                type=="unit" ? 
                                    <Form.Radio key={item.id} value={item.id}><div className="xlabel"><span>{item.name}</span> <span className="count">{item.count}</span></div></Form.Radio> :
                                    <Form.Radio key={item.vKey} value={item.vKey}>{item.name}</Form.Radio>
                            ))
                        }
                    </Form.RadioSet>
                </Form.Group>
            </Popover.Content>
        </Popover>
      );

    return (
        <div>
            <OverlayTrigger
                trigger={[]}
                key="bottom-basic"
                placement="bottom"
                show={showPopover}
                onToggle={() => setShowPopover(!showPopover)}
                overlay={popover}
            >
                <Button className="popover-button" onClick={() => setShowPopover(!showPopover)}>{nameFilter}</Button>
            </OverlayTrigger>
        </div>
    )
}

export default SearchFilter;