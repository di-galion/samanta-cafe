import Providers from "@/providers/providers";
import Button from "@/components/ui/button/Button";
import {FC} from "react";
import {Metadata, NextPage, ResolvingMetadata} from "next";
import Input from "@/components/ui/input/Input";
import HomePage from "@/components/screens/home/HomePage";
import Header from "@/components/ui/header/Header";
import {Props} from "next/script";


export const metadata: Metadata = {
  title: 'Home page',
  description: 'Some description',
}

const Home: NextPage = () => {
  return (
        <HomePage />
  )
}

export default Home

