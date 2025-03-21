import Image from 'next/image'
import React from 'react'

import avatar1 from "@/public/avatars/avatar.jpg"
import avatar2 from "@/public/avatars/avatar-2.jpg"
import avatar3 from "@/public/avatars/avatar-3.jpg"
import avatar4 from "@/public/avatars/avatar-4.jpg"
import avatar5 from "@/public/avatars/avatar-5.jpg"

const UserActions = () => {
	return (
		<div className="navbar-collapse collapse">
			<ul className="navbar-nav navbar-align">
				<li className="nav-item dropdown">
					<div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="alertsDropdown">
						<div className="list-group">
							<a href="#" className="list-group-item">
								<div className="row g-0 align-items-center">
									<div className="col-2">
										<i className="text-danger" data-feather="alert-circle"></i>
									</div>
									<div className="col-10">
										<div className="text-dark">Update completed</div>
										<div className="text-muted small mt-1">Restart server 12 to complete the
											update.</div>
										<div className="text-muted small mt-1">30m ago</div>
									</div>
								</div>
							</a>
							<a href="#" className="list-group-item">
								<div className="row g-0 align-items-center">
									<div className="col-2">
										<i className="text-warning" data-feather="bell"></i>
									</div>
									<div className="col-10">
										<div className="text-dark">Lorem ipsum</div>
										<div className="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate
											hendrerit et.</div>
										<div className="text-muted small mt-1">2h ago</div>
									</div>
								</div>
							</a>
							<a href="#" className="list-group-item">
								<div className="row g-0 align-items-center">
									<div className="col-2">
										<i className="text-primary" data-feather="home"></i>
									</div>
									<div className="col-10">
										<div className="text-dark">Login from 192.186.1.8</div>
										<div className="text-muted small mt-1">5h ago</div>
									</div>
								</div>
							</a>
							<a href="#" className="list-group-item">
								<div className="row g-0 align-items-center">
									<div className="col-2">
										<i className="text-success" data-feather="user-plus"></i>
									</div>
									<div className="col-10">
										<div className="text-dark">New connection</div>
										<div className="text-muted small mt-1">Christina accepted your request.
										</div>
										<div className="text-muted small mt-1">14h ago</div>
									</div>
								</div>
							</a>
						</div>
						<div className="dropdown-menu-footer">
							<a href="#" className="text-muted">Show all notifications</a>
						</div>
					</div>
				</li>
				<li className="nav-item dropdown">
					<div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="messagesDropdown">
						<div className="dropdown-menu-header">
							<div className="position-relative">
								4 New Messages
							</div>
						</div>
						<div className="list-group">
							<a href="#" className="list-group-item">
								<div className="row g-0 align-items-center">
									<div className="col-2">
										<Image src={avatar5} className="avatar img-fluid rounded-circle" alt="Vanessa Tucker" />
									</div>
									<div className="col-10 ps-2">
										<div className="text-dark">Vanessa Tucker</div>
										<div className="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu
											tortor.</div>
										<div className="text-muted small mt-1">15m ago</div>
									</div>
								</div>
							</a>
							<a href="#" className="list-group-item">
								<div className="row g-0 align-items-center">
									<div className="col-2">
										<Image src={avatar2} className="avatar img-fluid rounded-circle" alt="William Harris" />
									</div>
									<div className="col-10 ps-2">
										<div className="text-dark">William Harris</div>
										<div className="text-muted small mt-1">Curabitur ligula sapien euismod
											vitae.</div>
										<div className="text-muted small mt-1">2h ago</div>
									</div>
								</div>
							</a>
							<a href="#" className="list-group-item">
								<div className="row g-0 align-items-center">
									<div className="col-2">
										<Image src={avatar4} className="avatar img-fluid rounded-circle" alt="Christina Mason" />
									</div>
									<div className="col-10 ps-2">
										<div className="text-dark">Christina Mason</div>
										<div className="text-muted small mt-1">Pellentesque auctor neque nec urna.
										</div>
										<div className="text-muted small mt-1">4h ago</div>
									</div>
								</div>
							</a>
							<a href="#" className="list-group-item">
								<div className="row g-0 align-items-center">
									<div className="col-2">
										<Image src={avatar3} className="avatar img-fluid rounded-circle" alt="Sharon Lessman" />
									</div>
									<div className="col-10 ps-2">
										<div className="text-dark">Sharon Lessman</div>
										<div className="text-muted small mt-1">Aenean tellus metus, bibendum sed,
											posuere ac, mattis non.</div>
										<div className="text-muted small mt-1">5h ago</div>
									</div>
								</div>
							</a>
						</div>
						<div className="dropdown-menu-footer">
							<a href="#" className="text-muted">Show all messages</a>
						</div>
					</div>
				</li>
				<li className="nav-item dropdown d-flex">
					<a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
						<i className="align-middle" data-feather="settings"></i>
					</a>

					<div className="search-group">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search align-middle me-2">
							<circle cx="11" cy="11" r="8"></circle>
							<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
						</svg>
						<input type="text" className="form-control" placeholder="Search" />
					</div>

					

					<a className="nav-link dropdown-toggle d-flex align-items-center" href="#" data-bs-toggle="dropdown">
						<Image src={avatar1} className="avatar img-fluid rounded me-1" alt="Charles Hall" />
						<div>
							<span className="text-dark">Charles Hall</span>
							<p className="m-0">Admin</p>
						</div>
					</a>

					<div className="dropdown-menu dropdown-menu-end">
						<a className="dropdown-item" href="pages-profile.html"><i className="align-middle me-1" data-feather="user"></i> Profile</a>
						<a className="dropdown-item" href="#"><i className="align-middle me-1" data-feather="pie-chart"></i> Analytics</a>
						<div className="dropdown-divider"></div>
						<a className="dropdown-item" href="index.html"><i className="align-middle me-1" data-feather="settings"></i> Settings & Privacy</a>
						<a className="dropdown-item" href="#"><i className="align-middle me-1" data-feather="help-circle"></i> Help Center</a>
						<div className="dropdown-divider"></div>
						<a className="dropdown-item" href="#">Log out</a>
					</div>
				</li>
			</ul>
		</div>
	)
}

export default UserActions