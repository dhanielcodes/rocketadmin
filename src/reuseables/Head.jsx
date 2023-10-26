import { Badge, Avatar, Space, Grid } from '@arco-design/web-react';
import { IconClockCircle } from '@arco-design/web-react/icon';
import { IconUser,IconNotification } from '@arco-design/web-react/icon';
import { Breadcrumb } from '@arco-design/web-react';
import styled from 'styled-components';
const BreadcrumbItem = Breadcrumb.Item;

const App = () => {
  return (
    <Content>

<Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem href='#'>
          Channel
        </BreadcrumbItem>
        <BreadcrumbItem>News</BreadcrumbItem>
      </Breadcrumb>
    {/* <Space size={30} style={{display:'inline-flex',float:'right',paddingRight:'5px'}}>
      <Badge count={9} >
        <Avatar shape='circle' >
        <span>
      <IconNotification />
          </span>
        </Avatar>

      </Badge> 
       <Badge
        count={9}
        dot
        dotStyle={{ width: 8, height: 8 }}
      >
        <Avatar shape='square'>
            <span>
            <IconUser />

            </span>
        </Avatar>
      </Badge> 
       <Badge
        count={
          <IconClockCircle
            style={{ verticalAlign: 'middle', color: 'var(--color-text-2)' }}
          />
        }
        dotStyle={{
          height: 16,
          width: 16,
          fontSize: 14,
        }}
      >
        <Avatar shape='square' />
      </Badge>
       
    </Space> */}
      
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  justify-content: space-between;



`

export default App;
