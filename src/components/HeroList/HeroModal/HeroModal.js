import {Button, Modal, Row, Typography, Form, Input, Select} from "antd"
import {DeleteFilled} from "@ant-design/icons"
import React, {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { fetchTypes } from "../../../redux/slices/types/typesSlice"
import "./HeroModal.less"
import { useHistory } from "react-router"

const HeroModal = ({hero, onOk, onCancel}) => {
    const [heroToAdd, setHeroToAdd] = useState({avatar_url:"",full_name: "", type: null, description: ""})
    const availableTypes = useSelector(state => state.typesReducer.types)
    const loading = useSelector(state => state.heroesReducer.loading)
    const dispatch = useDispatch()
    const history = useHistory()

    const validateMessages = {
        required: '${label} is required!',
    };

    const handleSave = () => {
        onOk(heroToAdd).then(r => r.type !== "users/addHero/rejected" && history.push("/"))
    }

    const handleDelete = () => {
        onOk(hero).then(r => r.type !== "users/addHero/rejected" && history.push("/"))
    }

    const validateForm = () => !Object.values(heroToAdd).some(value => value === "" || !value )

    useEffect(() => {
        dispatch(fetchTypes())
    }, [])

    return (
        <Modal 
        destroyOnClose={true}
        onCancel={onCancel}
        width={345}
        visible={hero} 
        title={hero === "NEW" ? "Add hero" : " "} 
        className="HeroModal"
        footer={hero === "NEW" 
        ? <Row justify="center">
                <Button type="success" className="HeroModal__button" onClick={handleSave} disabled={!validateForm()}>
                    Save
                </Button>
            </Row> 
            : <Row justify="center">
                <Typography.Text type="danger" strong className="HeroModal__button" onClick={handleDelete}>
                    <DeleteFilled className="icon" />
                    Delete hero
                </Typography.Text>
            </Row>}
        >
        {hero === "NEW" 
        ? (
            <>
                <img alt={`${hero.full_name} avatar`} width={94} height={94} src={"http://localhost:4000/assets/avocado.png"} />
                <Form layout="vertical" className="HeroModal__heroForm" validateMessages={validateMessages} requiredMark={false}>
                    <Form.Item className="field" name="Avatar URL" label="Avatar URL" rules={[{required: true, message: "Avatar URL is required"}]}>
                        <Input value={heroToAdd.avatar_url} onChange={({target}) => setHeroToAdd({...heroToAdd, avatar_url: target.value})} />
                    </Form.Item>
                    <Form.Item className="field" name="Full name" label="Full name" rules={[{required: true, message: "Name is required"}]}>
                        <Input value={heroToAdd.full_name}  onChange={({target}) => setHeroToAdd({...heroToAdd, full_name: target.value})} />
                    </Form.Item>
                    <Form.Item className="field" name="Type" label="Type" rules={[{required: true, message: "Type is required"}]}>
                        <Select placeholder="Select type" value={heroToAdd.type} onChange={(value) => setHeroToAdd({...heroToAdd, type: value})} >
                        {loading ? <Select.Option value={null}>Loading...</Select.Option> : availableTypes.map(t => <Select.Option key={t.id} value={t.id}>{t.name}</Select.Option>)}    
                        </Select>
                    </Form.Item>
                    <Form.Item className="field" name="Description" label="Description" rules={[{required: true, message: "Description"}]}>
                        <Input.TextArea value={heroToAdd.description}  onChange={({target}) => setHeroToAdd({...heroToAdd, description: target.value})} />
                    </Form.Item>
                </Form>
            </>
        ) 
        : hero && (
            <>
                <div className="HeroModal__heroAvatar">
                    <img alt={`${hero.full_name} avatar`} src={hero.avatar_url} />
                </div>
                <div className="HeroModal__heroName">
                    <Typography.Title level={3} className="name">{hero.full_name}</Typography.Title>
                    <Typography.Title level={5} className="type" type="secondary">{hero.type.name}</Typography.Title>
                </div>
                <div className="HeroModal__heroDescription">
                    <Typography.Text>{hero.description}</Typography.Text>
                </div>
            </>
        )}
        </Modal>
    )
}

export default HeroModal