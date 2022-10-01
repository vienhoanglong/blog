import { Button } from "components/button"
import { Radio } from "components/checkbox"
import { Dropdown } from "components/dropdown"
import { Field } from "components/field"
import { Input } from "components/input"
import { Label } from "components/label"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import slugify from "slugify"
import styled from "styled-components"
import { POST_STATUS } from "utils/constants"
import ImageUpload from "components/image/ImageUpload"
import useFirebaseImage from "hooks/useFirebaseImage";
import Toggle from "components/toggle/Toggle"
import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "firebases/firebase-config"
import { useAuth } from "contexts/auth-context"
import { toast } from "react-toastify"
const PostAddNewStyles = styled.div``
const PostAddNew = () => {
  const {userInfo} = useAuth()
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: "",
      hot: false
    },
  });
  const { image, progress, handleSelectImage, handleDeleteImage } = useFirebaseImage(setValue, getValues);
  const [categories, setCategories] = useState([])
  const [selectCategory, setSelectCategory] = useState({})
  const watchStatus = watch("status")
  const watchHot = watch("hot")
  const addPostHandler = async(values) =>{
    const requestValues = {...values}
    requestValues.slug = slugify(values.slug || values.title, {lower: true})
    requestValues.status = Number(values.status)
    const colRef = collection(db, "posts")
    await addDoc(colRef,{
      ...requestValues,
      image,
      userId : userInfo.uid,
    })
    toast.success("Create new post successfully")
    reset({
      title: "",
      slug: "",
      status: 2,
      category: "",
      hot: false,
      image: "",
    })
    setSelectCategory({})
  }
  useEffect(()=>{
    async function getData(){

      const colRef = collection(db, "categories")
      const q = query(colRef, where("status", "==", 1))
      const querySnapshot = await getDocs(q)
      let result = []
      querySnapshot.forEach((doc)=>{
        result.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setCategories(result)
    }
    getData()
  },[])
  const handleClickOption = (item) =>{
    setValue("categoryId", item.id)
    setSelectCategory(item)
  }
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload className="h-[250px]" onChange={handleSelectImage} progress={progress} image={image} handleDeleteImage={handleDeleteImage}></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder={`${selectCategory.name || "Select category"}`}></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 && categories.map((item) =>(
                  <Dropdown.Option key={item.id} onClick={()=>handleClickOption(item)}>{item.name}</Dropdown.Option>
                ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && <span className="inline-block p-3 rounded-lg bg-green-50 text-sm font-medium text-green-600">{selectCategory?.name}</span>
             }
          </Field>
          <Field>
            <Label>Author</Label>
            <Input control={control} placeholder="Find the author"></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature post</Label>
            <Toggle on={watchHot === true} onClick={()=>setValue("hot", !watchHot)}></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === POST_STATUS.APPROVED}
                value={POST_STATUS.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === POST_STATUS.PENDING}
                value={POST_STATUS.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === POST_STATUS.REJECT}
                value={POST_STATUS.REJECT}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;