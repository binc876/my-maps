import { Card, Col, Container, Row } from 'react-bootstrap'

import post1 from '../assets/post-instagram/post1.jpeg'
import post2 from '../assets/post-instagram/post2.jpeg'
import post3 from '../assets/post-instagram/post3.jpeg'
import post4 from '../assets/post-instagram/post4.jpeg'

export const InstagramCard = () => {
    const posts = [
        {
            Thumb: post1,
            Link: 'https://www.instagram.com/p/C7ejLHIpzdU/?utm_source=ig_web_copy_link',
            Caption: 'Menduduki peringkat 2 secara umum...'
        },
        {
            Thumb: post2,
            Link: 'https://www.instagram.com/p/C7I6DMipVxI/?utm_source=ig_web_copy_link',
            Caption: 'Menang lageee Kagak hanya jago bius...'
        },
        {
            Thumb: post3,
            Link: 'https://www.instagram.com/p/C8Vh78oS0JY/?utm_source=ig_web_copy_link',
            Caption: 'Lebaran Idul Adha sudah tiba Selamat berkurban kami ucapkan'
        },
        {
            Thumb: post4,
            Link: '',
            Caption: 'Modal nekad band Dekan Cup FK-UB 2024 Dari anestesiologi dan Terapi Intensif...'
        }
    ]

    return (
    <div>
        <Container>
        <Row>
            {posts.map((post, index) => (
                <Col key={index} lg='3'>
                    <Card>
                        <a href={post.Link} target='_blank'>
                        <Card.Img src={post.Thumb}/>
                        </a>
                        <Card.Body>
                            <Card.Text className='sm'>
                                {post.Caption}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        </Container>
    </div>
  )
}



