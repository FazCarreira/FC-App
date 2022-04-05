import { Avatar, Grid, Stack } from "@mui/material";
import { Desc, SubTitle, Title } from "../../App/components/StyledComponents";

const EmpresaInicio = () => {
    return (<Stack>
        <Title sx={{ my: 2 }}>Bem-vindo(a)</Title>
        <Desc>
            Quidem quia aut itaque. Nam quisquam vitae corrupti placeat aut optio. Ab quo perspiciatis et eum cumque. Suscipit eos sed in alias dolorem. Laudantium ut et similique sequi. Eum voluptatum nam quibusdam facilis nam qui qui reprehenderit. Sit quo aliquam pariatur expedita. Velit voluptates vero sed. Voluptates quas iusto ut velit consequatur.
        </Desc>
        <Title sx={{ mt: 2 }}>O que preciso saber?</Title>
        <Desc>
            Qui eum aut assumenda assumenda non nihil nam. Delectus dolore qui error sapiente. Quaerat aspernatur veniam possimus esse explicabo quasi tempora quaerat. Asperiores saepe eligendi voluptate fuga reprehenderit dolores. Sint eius unde beatae sit. Quia et eaque commodi.Nostrum necessitatibus praesentium ipsa eos incidunt voluptas. Iusto impedit a inventore omnis est. Aliquid perspiciatis quibusdam quis et consequatur. Corrupti animi eos suscipit numquam dolorum. Ut fugiat libero sit possimus expedita dolor ut quos. Ipsa sit ratione eos saepe itaque. Laboriosam error qui aliquid eaque. Ut laudantium culpa dignissimos non culpa. Neque amet aut aperiam.
        </Desc>
        <Title sx={{ my: 2 }}>Sobre o selo da faz carreira</Title>
        <Stack spacing={2} flexDirection='row'>
            <Stack spacing={2} alignItems='center' sx={{mx:5}} >
                <Avatar sx={{ width: 64, height: 64 }} src='https://via.placeholder.com/300/cd7f32/?text=%20' />
                <Avatar sx={{ width: 64, height: 64 }} src='https://via.placeholder.com/300/c0c0c0/?text=%20' />
                <Avatar sx={{ width: 64, height: 64 }} src='https://via.placeholder.com/300/ffd700/?text=%20' />
            </Stack>
            <Desc>Nulla non voluptatem vel porro quia quod. Qui deserunt recusandae qui rem voluptates voluptas. Aliquid impedit aut quia nulla vitae repudiandae. Dignissimos maxime ut quam ad eos et non. Quos modi cupiditate voluptate. Facilis eligendi sequi dolor eius vitae. Et assumenda aut sed non. Illum voluptatibus voluptas assumenda consequatur. Sit nulla rerum officiis quia voluptate quod. Sequi exercitationem reiciendis et eos. Omnis maiores inventore autem unde enim praesentium et et. Id a quisquam alias quaerat amet animi dolor et. Laudantium laboriosam sint ut. Facilis suscipit ut laudantium animi reprehenderit ut iste. Rerum eligendi sit repellendus ratione ratione. Quo explicabo aspernatur laudantium eos velit a. Commodi distinctio consequatur ut aut laborum. Molestiae non quod beatae. Est sapiente dolor voluptatem quia nihil numquam ipsa voluptas. Assumenda accusamus eum enim ad non sit. Porro deleniti tenetur repellendus expedita. Amet nisi error consequatur dolor unde iusto perspiciatis. Fugit officiis esse dolorem temporibus non est et.</Desc>
        </Stack>
    </Stack>);
}

export default EmpresaInicio;