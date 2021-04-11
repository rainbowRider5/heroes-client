import {Button, Modal, Row, Typography} from "antd"
import {DeleteFilled} from "@ant-design/icons"
import React, {useState} from "react"
import "./HeroModal.less"

const HeroModal = ({hero, onOk, onCancel}) => {
    const [heroToAdd, setHeroToAdd] = useState({avatar_url:"",full_name: "", type: null, description: ""})
    return (
        <Modal 
        onCancel={onCancel}
        width={345}
        visible={hero} 
        title={hero === "NEW" ? "Add hero" : ""} 
        className="HeroModal"
        footer={hero === "NEW" 
        ? <Row justify="center">
                <Button type="success" className="HeroModal__button" onClick={() => onOk(heroToAdd)}>
                    Save
                </Button>
            </Row> 
            : <Row justify="center">
                <Typography.Text type="danger" strong className="HeroModal__button" onClick={() => onOk(hero)}>
                    <DeleteFilled className="icon" />
                    Delete hero
                </Typography.Text>
            </Row>}
        >
            hero
        </Modal>
    )
}

export default HeroModal