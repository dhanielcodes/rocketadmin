import { useEffect, useState } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
//import SearchInput from "../reuseables/SearchInput";
import CustomTable from "../reuseables/CustomTable";
import AddPaymentProcessorModal from "../modals/AddPaymentProcessorModal";
import { Select, Switch } from "@arco-design/web-react";
import {
  getRoleMenu,
  getRoles,
  updateUserMenu,
  updateUserSubMenu,
} from "../services/Dashboard";
import { useMutation, useQuery } from "@tanstack/react-query";
import AppSelect from "../reuseables/AppSelect";
import toast from "react-hot-toast";

// hhhhhhh
function UserAccessPage() {
  const [inviteAgent, setInviteAgent] = useState(false);

  const [selectedRole, setSelectedRole] = useState();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails?.userRoleMenuAccess);
  const {
    data: userMenu,
    isLoading: menuLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["getRoleMenu"],
    queryFn: () => getRoleMenu(),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: updateUserMenu,
    onSuccess: (data) => {
      if (data.status) {
        console.log(data);
        toast.success(data?.message);
        refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const { mutate: mutateSub, isLoading: isLoadingSub } = useMutation({
    mutationFn: updateUserSubMenu,
    onSuccess: (data) => {
      if (data.status) {
        console.log(data);
        toast.success(data?.message);
        refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });
  const columns = [
    {
      title: "MODULE",
      dataIndex: "name",
      width: 80,
    },

    {
      title: "DENY",
      dataIndex: "deny",
      width: 100,
      //render: () => "Other 2",
    },

    {
      title: "READ-ONLY",
      dataIndex: "read",
      width: 100,
      //render: () => "Other 2",
    },
    {
      title: "READ/WRITE",
      dataIndex: "readWrite",
      width: 100,
      //render: () => "Other 2",
    },
  ];

  const [selected, setSelected] = useState();

  const rolemnei = userMenu?.data;

  const data2 = rolemnei?.find((item) => item?.id === selectedRole?.id);
  console.log(data2, "kss");
  const newData = data2?.userRoleMenuAccess?.map((item) => {
    return {
      ...item,
      name: (
        <div
          onClick={() => {
            setSelected(item);
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <a href="#other">{item?.menuName}</a>
        </div>
      ),
      deny: (
        <div>
          <Switch
            onClick={() => {
              mutate({
                accessId: item?.accessId,
                menuAccessType: {
                  id: 1,
                },
              });
            }}
            checked={item?.menuAccessType?.id === 1}
          />
        </div>
      ),
      read: (
        <div>
          <Switch
            onClick={() => {
              mutate({
                accessId: item?.accessId,
                menuAccessType: {
                  id: 2,
                },
              });
            }}
            checked={item?.menuAccessType?.id === 2}
          />
        </div>
      ),
      readWrite: (
        <div>
          <Switch
            onClick={() => {
              mutate({
                accessId: item?.accessId,
                menuAccessType: {
                  id: 3,
                },
              });
            }}
            checked={item?.menuAccessType?.id === 3}
          />
        </div>
      ),
    };
  }); /* ||
    selectedRole?.userRoleMenuAccess?.map((item) => {
      return {
        ...item,
        name: (
          <div
            onClick={() => {
              setSelected(item);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <a href="#other">{item?.menuName}</a>
          </div>
        ),
        deny: (
          <div>
            <Switch
              onClick={() => {
                mutate({
                  accessId: item?.accessId,
                  menuAccessType: {
                    id: 1,
                  },
                });
              }}
              checked={item?.menuAccessType?.id === 1}
            />
          </div>
        ),
        read: (
          <div>
            <Switch
              onClick={() => {
                mutate({
                  accessId: item?.accessId,
                  menuAccessType: {
                    id: 2,
                  },
                });
              }}
              checked={item?.menuAccessType?.id === 2}
            />
          </div>
        ),
        readWrite: (
          <div>
            <Switch
              onClick={() => {
                mutate({
                  accessId: item?.accessId,
                  menuAccessType: {
                    id: 3,
                  },
                });
              }}
              checked={item?.menuAccessType?.id === 3}
            />
          </div>
        ),
      };
    }); */

  const newData2 = selected?.userRoleSubMenuAccess?.map((item) => {
    return {
      ...item,
      name: (
        <div>
          <span>{item?.subMenuName}</span>
        </div>
      ),
      deny: (
        <div>
          <Switch
            onClick={() => {
              mutateSub({
                accessId: item?.accessId,
                menuAccessType: {
                  id: 1,
                },
              });
            }}
            checked={item?.menuAccessType?.id === 1}
          />
        </div>
      ),
      read: (
        <div>
          <Switch
            onClick={() => {
              mutateSub({
                accessId: item?.accessId,
                menuAccessType: {
                  id: 2,
                },
              });
            }}
            checked={item?.menuAccessType?.id === 2}
          />
        </div>
      ),
      readWrite: (
        <div>
          <Switch
            onClick={() => {
              mutateSub({
                accessId: item?.accessId,
                menuAccessType: {
                  id: 3,
                },
              });
            }}
            checked={item?.menuAccessType?.id === 3}
          />
        </div>
      ),
    };
  });

  console.log(newData);

  return (
    <>
      {inviteAgent && (
        <AddPaymentProcessorModal closeinviteAgent={setInviteAgent} />
      )}
      <BodyLayout active={window.location.pathname}>
        <Content>
          <div className="header">
            <div className="top">
              <p>User Access</p>
              <span>
                This page allows you to manage all user access privileges{" "}
              </span>
            </div>
            <div className="btn"></div>
          </div>
          <div className="main">
            <div
              style={{
                width: "400px",
                padding: "10px 20px",
                position: "relative",
                zIndex: 1000,
              }}
            >
              <p className="">Select Role</p>
              <AppSelect
                value={selectedRole}
                options={userMenu?.data?.map((item) => {
                  return {
                    label: item?.name,
                    value: item?.name,
                    ...item,
                  };
                })}
                onChange={(val) => {
                  setSelectedRole(val);
                  setSelected();
                }}
              />
            </div>
            <CustomTable
              noData={newData?.length}
              Apidata={newData || []}
              tableColumns={columns}
              loading={menuLoading || isLoading || isLoadingSub || isFetching}
              scroll={{
                x: 800,
                y: 800,
              }}
            />
          </div>
          <br />
          <div className="main" id="other">
            <CustomTable
              noData={newData2?.length}
              Apidata={newData2 || []}
              loading={menuLoading || isLoading || isLoadingSub || isFetching}
              tableColumns={columns}
              scroll={{
                x: 800,
                y: 800,
              }}
            />
          </div>
          <br />
        </Content>
      </BodyLayout>
    </>
  );
}

export default UserAccessPage;

const Content = styled.div`
  .head {
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }
  .head button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
  }
  .search {
    display: flex;
    justify-content: space-between;
  }
  .main {
    background-color: white;
    width: 100%;
    margin-top: 30px;
    border-radius: 10px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .top p {
    font-size: 32px;
    font-weight: 500;
  }
  .top span {
    font-size: 15px;
    color: #848d87;
    font-weight: 400;
  }
  .btn {
    display: flex;
    gap: 10px;
  }
  .btn button {
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 12px 13px 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100%;
  }

  .table th {
    font-weight: 500;
    text-align: left;
    font-size: 13px;
    padding: 18px;
    color: #687182;
    background-color: #f9fafb;
  }

  .table td {
    padding: 22px;
    font-weight: 500;
    font-size: 14px;
    border-top: 1px solid gainsboro;
  }
  .table span {
    font-size: 14px;
    font-weight: 400;
    color: #667085;
  }
  .row {
    display: flex;
    justify-content: space-between;
    padding: 25px;
  }

  .row span {
    font-size: 15px;
    color: #687182;
  }

  .pagins {
    display: flex;
    gap: 7px;
    align-items: center;
  }

  .pagins p {
    font-size: 14px;
    color: #687182;
  }

  .pagins select {
    width: 48px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    padding: 2px;
    border-radius: 3px;
  }

  .arrow {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .arrow button {
    width: 28.8px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    border-radius: 3px;
  }
`;
